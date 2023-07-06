import { BroadcastServiceResolver as ServiceResolver } from '@formidablejs/broadcaster/src/server'

export class BroadcastServiceResolver extends ServiceResolver {
	/**
	 * Boot service resolver.
	 */
	boot(): BroadcastServiceResolver {
		require('../../routes/channels')

		return this
	}
}
