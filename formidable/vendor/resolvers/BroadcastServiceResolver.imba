import { BroadcastServiceResolver as ServiceResolver } from '@formidablejs/broadcaster'

export class BroadcastServiceResolver < ServiceResolver

	# Boot service resolver.
	def boot\BroadcastServiceResolver
		require('../../routes/channels')

		this
