type ChannelMessage<TPayload, TParams> = {
	id: string;
	user?: User;
	userAgent?: string;
	params?: TParams;
	payload: TPayload;
	connection: number
}

type ChannelCallback<TPayload = string, TParams = unknown> = (message: ChannelMessage<TPayload, TParams>) => Promise<boolean> | boolean

export {
	ChannelMessage,
}

export default ChannelCallback
