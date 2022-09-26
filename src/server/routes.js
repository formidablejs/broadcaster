const { Redis } = require("@formidablejs/framework");

module.exports = function (fastify, opts, done) {
    fastify.get('/listen/:channel', (request, reply) => {
        reply.raw.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        })

        send(reply, request.params.channel)
    })
    done()
}

/**
 * Send event.
 *
 * @param {import("@formidablejs/framework").FastifyReply} reply
 * @param {string} channel
 */
const send = (reply, channel) => {
    Redis.connection('cache').then((connection) => {
        connection.get(`channel:${channel}`).then((payload) => {
            if (payload !== null) {
                reply.raw.write(`data: ${payload}\n\n`)
            }
        })
    })

    setTimeout(() => send(reply, channel), 100)
}
