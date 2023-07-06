import { ServiceResolver } from '@formidablejs/framework'

export default class BroadcastServiceResolver extends ServiceResolver {
	/**
	 * Get the prefix for the broadcast routes.
	 */
	getPrefix(): string
}