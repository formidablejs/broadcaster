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
const send = async (reply, request, channel) => {
    const refreshRate = getRefreshRate();
    const connection = await Redis.connection(config('broadcasting.expiration.connection', 'default'));

    const interval = setInterval(async () => {
        try {
            await persist(request, reply, channel, connection);
        } catch (e) {
            if (e.message && e.message !== 'Socket already opened') {
                throw e
            }
        }
    }, refreshRate);

    return interval
}

/**
 * Get messages from Redis.
 *
 * @param {import("@formidablejs/framework").Request} request
 * @param {import("@formidablejs/framework").FastifyReply} reply
 * @param {string} channel
 * @param connection
 */
const persist = async (request, reply, channel, connection) => {
    const prefix = getPrefix();
    const urlSlice = request.url().slice(prefix.length);
    const publishMode = getPublishMode();
    const channelKey = `channel:${urlSlice}`;

    if (publishMode === 'append') {
        const keys = await connection.keys(`${channelKey}:*`);
        const payloads = await Promise.all(keys.map((key) => connection.get(key)));
        for (const payload of payloads) {
            sendToClient(payload, request, reply, channel);
        }
    } else {
        const payload = await connection.get(channelKey);
        sendToClient(payload, request, reply, channel);
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
