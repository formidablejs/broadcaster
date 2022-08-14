const { Redis } = require('@formidablejs/framework')
const { isString } = require('@formidablejs/framework/lib/Support/Helpers')

module.exports = class Channel {
    /**
     * Create a new channel instance.
     *
     * @param {string} message
     */
    constructor(message) {
        this.message = message

        try {
            this.message = JSON.stringify(this.message)
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
    static broadcast(message) {
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
            EX: 5,
        })

        return true
    }
}
