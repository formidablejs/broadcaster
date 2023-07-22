type ChannelMessage<TPayload = unknown, TParams = unknown, TQuery = unknown> = {
	id: string
	user?: User
	userAgent?: string
	params?: TParams
    query?: TQuery
	payload: TPayload
	connection: number
}

type ChannelCallback<TPayload = string, TParams = unknown, TQuery = unknown> = (message: ChannelMessage<TPayload, TParams, TQuery>) => Promise<boolean> | boolean

export {
	ChannelMessage,
}

export default ChannelCallback
