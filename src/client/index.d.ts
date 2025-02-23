import BroadcastingConfig from '../types/BroadcastingConfig'
import subscribe from './subscribe'
import SubscribeCallback from '../../types/SubscribeCallback'
import SubscribeOnError from '../../types/SubscribeOnError'
import SubscribeOnReady from '../../types/SubscribeOnReady'
import SubscriptionOptions from '../../types/SubscriptionOptions'

declare global {
    interface Window {
        BroadcastConfig: BroadcastingConfig
    }

    var BroadcastConfig: BroadcastingConfig
}

export {
    subscribe,
    SubscriptionOptions,
    SubscribeCallback,
    SubscribeOnError,
    SubscribeOnReady
}
