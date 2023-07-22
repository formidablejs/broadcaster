type ConnectionEvent<TParams = unknown, TQuery = unknown> = {
	user?: User
	userAgent?: string
	params?: TParams
    query?: TQuery
    event: 'open' | 'close' | 'error'
    error?: Error
}

export default ConnectionEvent
