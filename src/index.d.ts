import Broadcast from './server/Broadcast'
import BroadcastChannel from './server/BroadcastChannel'
import BroadcastServiceResolver from './server/BroadcastServiceResolver'
import Channel from './server/Channel'
import ChannelCallback, { ChannelMessage } from './../types/ChannelCallback'
import ConnectionEvent from './../types/ConnectionEvent'
import SubscribeCallback from './../types/SubscribeCallback'
import SubscribeOnError from './../types/SubscribeOnError'
import SubscribeOnReady from './../types/SubscribeOnReady'
import SubscriptionOptions from './../types/SubscriptionOptions'

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
    BroadcastChannel,
	BroadcastServiceResolver,
	Channel,
	ChannelCallback,
    ConnectionEvent,
	ChannelMessage,
	SubscribeCallback,
	SubscribeOnError,
	SubscribeOnReady,
	SubscriptionOptions
}
