const { config, Redis } = require("@formidablejs/framework");
const Broadcast = require("./Broadcast");
const BroadcastChannel = require("./BroadcastChannel");

const counter = {}

/**
 * Get the prefix for the broadcast routes.
 *
 * @returns {string}
 */
const getPrefix = () => {
    return `/${config('broadcasting.prefix', '_broadcast').replace(/\/$/, '').replace(/^\//, '')}/`
}

/**
 * Get the refresh rate.
 *
 * @returns {number}
 */
const getRefreshRate = () => {
    return config('broadcasting.redis.refresh_rate', 100) ?? 100
}

/**
 * Get the publish mode.
 *
 * @returns {'append' | 'overwrite'}
 * @throws {Error}
 */
const getPublishMode = () => {
    const mode = config('broadcasting.redis.publish_mode', 'append') ?? 'append'

    if (!['append', 'overwrite'].includes(mode.toLowerCase())) {
        throw new Error("Invalid publish mode. Expected 'append' or 'overwrite'")
    }

    return mode.toLowerCase()
}

/**
 * Send event.
 *
 * @param {import("@formidablejs/framework").FastifyReply} reply
 * @param {import("@formidablejs/framework").Request} request
 * @param {string} channel
 */
const send = (reply, request, channel) => {
    Redis.connection(config('broadcasting.expiration.connection', 'default'))
        .then((connection) => persist(request, reply, channel, connection))
        .catch((e) => {
            if (e.message && e.message !== 'Socket already opened') throw e
        })

    setTimeout(() => send(reply, request, channel), getRefreshRate())
}

/**
 * Get messages from Redis.
 *
 * @param {import("@formidablejs/framework").Request} request
 * @param {import("@formidablejs/framework").FastifyReply} reply
 * @param {string} channel
 * @param connection
 */
const persist = (request, reply, channel, connection) => {
    if (getPublishMode() === 'append') {
        connection.keys(`channel:${request.url().slice(getPrefix().length)}:*`).then((keys) => {
            keys.forEach((key) => {
                connection.get(key).then((payload) => sendToClient(payload, request, reply, channel))
            })
        })
    } else {
        connection.get(`channel:${request.url().slice(getPrefix().length)}`).then((payload) => {
            sendToClient(payload, request, reply, channel)
        })
    }
}

/**
 * Send the event to the client.
 *
 * @param {string} payload
 * @param {import("@formidablejs/framework").Request} request
 * @param {import("@formidablejs/framework").FastifyReply} reply
 * @param {string} channel
 */
const sendToClient = (payload, request, reply, channel) => {
    if (payload !== null) {
        counter[payload] = counter[payload] ? counter[payload] + 1 : 1

        const unserializedPayload = JSON.parse(payload)
        let message = null

        try {
            message = JSON.stringify(unserializedPayload.payload)
        } catch {
            message = unserializedPayload.payload
        }

        const broadcastMessage = {
            id: unserializedPayload.id,
            user: request.user(),
            userAgent: request.hasHeader('user-agent') ? request.header('user-agent') : null,
            params: request.params(),
            query: request.query(),
            payload: message,
            connection: counter[payload]
        }

        let callback = Broadcast.get(channel).callback

        callback = callback instanceof BroadcastChannel ? callback.publish : callback

        const isAsync = callback.constructor.name === 'AsyncFunction'

        if (isAsync) {
            callback(broadcastMessage).then((response) => {
                if (response == true) {
                    reply.raw.write(`id: ${unserializedPayload.id}\ndata: ${payload}\n\n`)
                }
            })
        } else if (callback(broadcastMessage)) {
            reply.raw.write(`id: ${unserializedPayload.id}\ndata: ${payload}\n\n`)
        }

        setTimeout(() => cleanUp(), 5000)
    }
}

/**
 * Clean up the counter.
 */
const cleanUp = () => {
    for (const payload in counter) {
        const timestamp = JSON.parse(payload).timestamp

        if (Date.now() - timestamp > 2000) {
            delete counter[payload]
        }
    }
}

module.exports = send
