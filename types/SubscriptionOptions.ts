import SubscribeCallback from './SubscribeCallback'
import SubscribeOnError from './SubscribeOnError'
import SubscribeOnReady from './SubscribeOnReady'

type SubscriptionOptions<T = unknown> = {
	onMessage: SubscribeCallback<T>
	onReady?: SubscribeOnReady
	onError?: SubscribeOnError
}

export default SubscriptionOptions
