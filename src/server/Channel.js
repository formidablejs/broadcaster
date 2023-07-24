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
            this.id = crypto.randomUUID()

            this.message = JSON.stringify({
                payload: message,
                timestamp: new Date().valueOf(),
                id: this.id
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

        if (!['PX', 'EX'].includes(config('broadcasting.expiration.mode', 'PX').toUpperCase())) {
            throw new Error("Invalid expiration mode. Expected 'PX' or 'EX'")
        }

        if (!['append', 'overwrite'].includes(config('broadcasting.redis.publish_mode', 'append').toLowerCase())) {
            throw new Error("Invalid publish mode. Expected 'append' or 'overwrite'")
        }

        /** @type {'PX' | 'EX'} mode */
        const mode = config('broadcasting.expiration.mode', 'PX')

        /** @type {number} ttl */
        const ttl = config('broadcasting.expiration.ttl', 300)

        /** @type {string} db */
        const db = config('broadcasting.expiration.connection', 'default')

        /** @type {Redis} */
        const connection = await Redis.connection(db)

        /** @type {string} */
        const key = `channel:${channel}` + (config('broadcasting.redis.publish_mode') === 'append' ? `:${this.id}` : '')

        await connection.set(key, this.message, {
            [mode.toUpperCase()]: ttl,
        })

        return true
    }
}
