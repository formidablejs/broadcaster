import { BroadcastChannel } from '@formidablejs/broadcaster'
import type { ChannelMessage, ConnectionEvent } from '@formidablejs/broadcaster'

export class {{class}} < BroadcastChannel

	# Subscribes a user to the channel.
	#
	# @param {ConnectionEvent} event
	# @return {Promise<void> | void}
	def subscribe event\ConnectionEvent
		console.log "Subscribed to \"{name}\" 🎉"

	# Unsubscribes a user from the channel.
	#
	# @param {ConnectionEvent} event
	# @return {Promise<void> | void}
	def unsubscribe event\ConnectionEvent
		console.log "Unsubscribed from \"{name}\" 👋"

	# Publishes a message to the channel.
	#
	# @param {ChannelMessage} message
	# @return {Promise<boolean> | boolean}
	def publish message\ChannelMessage
		return true
