import SubscriptionOptions from '../SubscriptionOptions'

type subscribe = (channel: string, options: SubscriptionOptions) => EventSource

export default subscribe
