const { Route, ServiceResolver } = require('@formidablejs/framework')
const send = require('./service')
const Broadcast = require('./Broadcast')

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
			Route.get(`/${this.getPrefix()}/${channel}`, (request, reply) => {
				reply.raw.writeHead(200, {
					'Content-Type': 'text/event-stream',
					'Cache-Control': 'no-cache',
					'Connection': 'keep-alive',
				})

				reply.raw.write('OK\n\n')

				send(reply, request, channel)
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
    }

	/**
	 * Get the prefix for the broadcast routes.
	 *
	 * @returns {string}
	 */
	getPrefix() {
		const prefix = this.app.config.get('broadcasting.prefix', '_broadcast')

		return prefix.replace(/\/$/, '').replace(/^\//, '')
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
