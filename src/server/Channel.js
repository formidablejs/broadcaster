const { Redis } = require('@formidablejs/framework')
const { isString } = require('@formidablejs/framework/lib/Support/Helpers')

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

        const connection = await Redis.connection('cache')

        await connection.set(`channel:${channel}`, this.message, {
            EX: 1,
        })

        return true
    }
}
