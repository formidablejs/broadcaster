const BroadcastChannel = require('./BroadcastChannel')

const settings = {
	channels: {}
}

module.exports = class Broadcast {
	/**
	 * @type {string} channel
	 */
	channel = null

	/**
	 * @param {string} channel
	 */
	constructor(channel) {
		this.channel = channel
	}

	/**
	 * @param {string} channel
	 * @param {import('../../types/ChannelCallback').default | import('./BroadcastChannel').IBroadcastChannel} callback
	 */
	static channel(channel, callback) {
		if (typeof callback !== 'function' && typeof callback !== 'undefined') {
			throw new TypeError('Callback must be a function')
		}

		if (settings.channels[channel]) {
			throw new Error(`Channel ${channel} already exists`)
		}

		if (typeof callback == 'undefined' || callback == null) {
			callback = () => true
		}

        if (typeof callback == 'function' && callback.prototype instanceof BroadcastChannel) {
            callback = new callback(channel)
        }

		settings.channels[channel] = {
			callback,
			name: null,
			middleware: []
		}

		return new Broadcast(channel)
	}

	/**
	 * @param {string} name
	 * @returns {Broadcast} this
	 */
	name(name) {
		if (typeof name !== 'string') {
			throw new TypeError('Name must be a string')
		}

		settings.channels[this.channel].name = `broadcast-channel.${name}`

		return this
	}

	/**
	 * @param {string|string[]} middleware
	 * @returns {Broadcast} this
	 */
	middleware(middleware) {
		if (Array.isArray(middleware) || typeof middleware == 'string' || typeof middleware == 'function') {
			settings.channels[this.channel].middleware = settings.channels[this.channel].middleware.concat(middleware)
		} else {
			throw new TypeError('Middleware must be a string or an array of strings')
		}

		return this
	}

	/**
	 * @private
	 */
	static getChannels() {
		return settings.channels
	}

	/**
	 * @private
	 */
	static has(channel) {
		return settings.channels[channel] !== undefined
	}

	/**
	 * @private
	 */
	static get(channel) {
		return settings.channels[channel]
	}
}
