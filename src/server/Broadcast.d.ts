import { IMiddleware } from '@formidablejs/framework/types/Http/Middleware/IMiddleware'
import { IBroadcastChannel } from './BroadcastChannel'
import ChannelCallback from '../../types/ChannelCallback'

export default class Broadcast {
	/**
	 * @private
	 */
	channel: string

	/**
	 * Create a new broadcast channel.
	 */
	constructor(channel: string)

	/**
	 * Define a channel.
	 */
	static channel(channel: string, callback?: ChannelCallback | IBroadcastChannel): Broadcast

	/**
	 * Set the channel name.
	 */
	name(name: string): Broadcast

	/**
	 * Set the channel middleware.
	 */
	middleware(middleware: string | IMiddleware | Array<string|IMiddleware>): Broadcast
}
