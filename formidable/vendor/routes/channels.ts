import { Broadcast } from '@formidablejs/broadcaster'
import type { ChannelMessage } from '@formidablejs/broadcaster'

/**
 * --------------------------------------------------------------------------
 * Channels
 * --------------------------------------------------------------------------
 *
 * Here you may register all of the event broadcasting channels that your
 * application will use. These channels may be listened to by clients and
 * are used to broadcast events to the client.
 */

Broadcast.channel('public-channel').name('public-channel')
