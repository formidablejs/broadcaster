const { config, Redis } = require('@formidablejs/framework')
const { isString } = require('@formidablejs/framework/lib/Support/Helpers')
const crypto = require('crypto')

module.exports = class Channel {
    /**
     * Create a new channel instance.
     *
     * @param {string} message
     */
    constructor(message) {
        try {
            this.message = JSON.stringify({
                payload: message,
                timestamp: new Date().valueOf(),
				id: crypto.randomUUID()
            })
        } catch {
            throw new Error("Invalid message")
        }
    }

    /**
     * Create a new channel instance.
     *
     * @param {string} message
     * @returns {Channel}
     */
    static publish(message) {
        return new Channel(message)
    }

    /**
     * Publish message to channel.
     *
     * @param {string} channel
     * @returns {Promise<boolean>}
     */
    async on(channel) {
        if (!isString(channel)) {
            throw new TypeError("Channel must be a string")
        }

		/** @type {'PX' | 'EX'} mode */
		const mode = config('broadcasting.expiration.mode', 'PX')

		/** @type {number} ttl */
		const ttl = config('broadcasting.expiration.ttl', 300)

		/** @type {string} db */
		const db = config('broadcasting.expiration.connection', 'default')

		const connection = await Redis.connection(db)

        await connection.set(`channel:${channel}`, this.message, {
            [mode]: ttl,
        })

        return true
    }
}
