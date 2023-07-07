const { config, Redis } = require("@formidablejs/framework");
const Broadcast = require("./Broadcast");

const counter = { }

/**
 * Get the prefix for the broadcast routes.
 *
 * @returns {string}
 */
const getPrefix = () => {
	const prefix = config('broadcasting.prefix', '_broadcast')

	return `/${prefix.replace(/\/$/, '').replace(/^\//, '')}/`
}

/**
 * Send event.
 *
 * @param {import("@formidablejs/framework").FastifyReply} reply
 * @param {import("@formidablejs/framework").Request} request
 * @param {string} channel
 */
const send = (reply, request, channel) => {
	/** @type {string} db */
	const db = config('broadcasting.expiration.connection', 'default')

    Redis.connection(db).then((connection) => {
        connection.get(`channel:${request.url().slice(getPrefix().length)}`).then((payload) => {
			if (payload !== null) {
				counter[payload] = counter[payload] ? counter[payload] + 1 : 1

				const isAsync = Broadcast.get(channel).constructor.name === 'AsyncFunction'
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
					payload: message,
					connection: counter[payload]
				}

				if (isAsync) {
					Broadcast.get(channel).callback(broadcastMessage).then((response) => {
						if (response == true) {
							reply.raw.write(`id: ${unserializedPayload.id}\ndata: ${payload}\n\n`)
						}
					})
				} else {
					if (Broadcast.get(channel).callback(broadcastMessage)) {
						reply.raw.write(`id: ${unserializedPayload.id}\ndata: ${payload}\n\n`)
					}
				}

				setTimeout(() => cleanUp(), 5000)
            }
        })
    })

    setTimeout(() => send(reply, request, channel), 100)
}

/**
 * Clean up counter.
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
