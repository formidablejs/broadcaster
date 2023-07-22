import SubscriptionOptions from '../../types/SubscriptionOptions'

export default function <T = unknown>(channel: string, options: SubscriptionOptions<T>): EventSource
