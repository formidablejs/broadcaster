const { Route, ServiceResolver } = require('@formidablejs/framework')
const send = require('./service')
const Broadcast = require('./Broadcast')
const MakeChannel = require('./Commands/MakeChannel')
const BroadcastChannel = require('./BroadcastChannel')

module.exports = class BroadcastServiceResolver extends ServiceResolver {
    /**
     * Boot broadcast service resolver.
     *
     * @returns {void}
     */
    register() {
		const channels = Broadcast.getChannels()
		const middleware = this.getMiddleware()

		for (const channel in channels) {
			Route.get(`/${this.getPrefix()}/${channel}`, (request, /** @type {import('@formidablejs/framework').FastifyReply} */ reply) => {
				reply.raw.writeHead(200, {
					'Content-Type': 'text/event-stream',
					'Cache-Control': 'no-cache',
					'Connection': 'keep-alive',
				})

				reply.raw.write('OK\n\n')

				send(reply, request, channel)

                const callback = Broadcast.get(channel).callback

                if (callback instanceof BroadcastChannel) {
                    const payload = {
                        user: request.user(),
                        userAgent: request.hasHeader('user-agent') ? request.header('user-agent') : null,
                        params: request.params(),
                        query: request.query()
                    }

                    callback.subscribe({...payload, event: 'open'})

                    reply.raw.on('close', () => callback.unsubscribe({...payload, event: 'close'}))
                    reply.raw.on('error', (e) => callback.unsubscribe({...payload, event: 'error', error: e}))
                }
			})

			if (channels[channel].name) {
				Route.name(channels[channel].name)
			}

			const allMiddleware = middleware.concat(channels[channel].middleware
				? channels[channel].middleware
				: []
			)

			if (allMiddleware.length > 0) {
				Route.middleware(allMiddleware)
			}
		}

        this.app.registerCommand(MakeChannel)
    }

	/**
	 * Get the prefix for the broadcast routes.
	 *
	 * @returns {string}
	 */
	getPrefix() {
		return this.app.config.get('broadcasting.prefix', '_broadcast').replace(/\/$/, '').replace(/^\//, '')
	}

	/**
	 * Get the middleware for the broadcast routes.
	 *
	 * @returns {string|import('@formidablejs/framework').IMiddleware[]}
	 */
	getMiddleware() {
		return this.app.config.get('broadcasting.middleware', [])
	}
}
