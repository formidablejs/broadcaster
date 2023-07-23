import { env } from '@formidablejs/framework'

export default {

	# --------------------------------------------------------------------------
	# Prefix
	# --------------------------------------------------------------------------
	#
	# Here you can specify the prefix that will be used to prefix the channel
	# paths. For example, if you specify a prefix of `_broadcast`, the channel
	# path will be `/_broadcast/channel`.

	prefix: '_broadcast'

	# --------------------------------------------------------------------------
	# Default Middleware
	# --------------------------------------------------------------------------
	#
	# This option allows you to define the default middleware that will be
	# applied to all broadcast streams. By default, the only middleware applied
	# is the `csrf:allow-get` middleware.

	middleware: ['csrf:allow-get']

	# --------------------------------------------------------------------------
	# Redis
	# --------------------------------------------------------------------------
	#
	# Here you may specify the Redis connection, publish mode, refresh rate,
	# and expiration details for your broadcast cache. If no connection is
	# specified, the default redis connection will be used. If no expiration
	# is specified, the default will be used.
	#
	# The `publish_mode` option may be either `overwrite` or `append` to
	# indicate whether the value should be overwritten (`overwrite`) or
	# appended (`append`) to the existing channel.
	#
	# Note: The `append` mode is very slow and should only be used when
	# absolutely necessary.
	#
	# The `refresh_rate` option may be any integer value. This value is used
	# to determine how often the channel should be refreshed. The default
	# value is `100` milliseconds.
	#
	# The `mode` option may be either `EX` or `PX` to indicate whether the
	# value should be set as seconds (`EX`) or milliseconds (`PX`).
	#
	# The `ttl` option may be any integer value.

	redis: {
		connection: env('BROADCAST_CONNECTION', 'cache')
		publish_mode: env('BROADCAST_PUBLISH_MODE', 'overwrite')
		refresh_rate: env('BROADCAST_REFRESH_RATE', 100)
		expiration: {
			mode: env('BROADCAST_EXPIRATION_MODE', 'PX')
			ttl: env('BROADCAST_EXPIRATION_TTL', 300)
		}
	}

}
