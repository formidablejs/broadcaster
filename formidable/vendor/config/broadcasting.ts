export default {

	/**
	 * --------------------------------------------------------------------------
	 * Prefix
	 * --------------------------------------------------------------------------
	 *
	 * Here you can specify the prefix that will be used to prefix the channel
	 * paths. For example, if you specify a prefix of `_broadcast`, the channel
	 * path will be `/_broadcast/channel`.
	 */

	prefix: '_broadcast',

	/**
	 * --------------------------------------------------------------------------
	 * Default Middleware
	 * --------------------------------------------------------------------------
	 *
	 * This option allows you to define the default middleware that will be
	 * applied to all broadcast streams. By default, the only middleware applied
	 * is the `csrf:allow-get` middleware.
	 */

	middleware: ['csrf:allow-get'],

	/**
	 * --------------------------------------------------------------------------
	 * Redis
	 * --------------------------------------------------------------------------
	 *
	 * Here you may specify the Redis connection and expiration details for your
	 * broadcast cache. If no connection is specified, the default redis
	 * connection will be used. If no expiration is specified, the default will
	 * be used.
	 *
	 * The `mode` option may be either `EX` or `PX` to indicate whether the
	 * value should be set as seconds (`EX`) or milliseconds (`PX`).
	 *
	 * The `ttl` option may be any integer value.
	 */

	redis: {
		connection: 'cache',
		expiration: {
			mode: 'PX',
			ttl: 300
		}
	}

}