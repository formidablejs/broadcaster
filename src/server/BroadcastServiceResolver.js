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

		for (const channel in channels) {
			Route.get(`/${this.getPrefix()}/${channel}`, (request, reply) => {
				reply.raw.writeHead(200, {
					'Content-Type': 'text/event-stream',
					'Cache-Control': 'no-cache',
					'Connection': 'keep-alive',
				})

				send(reply, request, channel)
			})

			if (channels[channel].name) {
				Route.name(channels[channel].name)
			}

			if (channels[channel].middleware) {
				Route.middleware(channels[channel].middleware)
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
}
