import Broadcast from './server/Broadcast'
import BroadcastServiceResolver from './server/BroadcastServiceResolver'
import Channel from './server/Channel'
import ChannelCallback, { ChannelMessage } from './ChannelCallback'
import SubscribeCallback from './SubscribeCallback'
import SubscribeOnError from './SubscribeOnError'
import SubscribeOnReady from './SubscribeOnReady'
import SubscriptionOptions from './SubscriptionOptions'

type BroadcastingConfig = {
	/**
	 * Specify the prefix that will be used to prefix the channel
	 * paths. For example, if you specify a prefix of `_broadcast`, the channel
	 * path will be `/_broadcast/channel`.
	 */
	prefix: string
}

declare global {
	interface Window {
		BroadcastConfig: BroadcastingConfig
	}

	var BroadcastConfig: BroadcastingConfig
}

export {
	Broadcast,
	BroadcastServiceResolver,
	Channel,
	ChannelCallback,
	ChannelMessage,
	SubscribeCallback,
	SubscribeOnError,
	SubscribeOnReady,
	SubscriptionOptions
}
