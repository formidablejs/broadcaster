import { BroadcastChannel } from '@formidablejs/broadcaster'
import type { ChannelMessage, ConnectionEvent } from '@formidablejs/broadcaster'

export class {{class}} extends BroadcastChannel {
    /**
     * Subscribes a user to the channel.
     */
    subscribe(event: ConnectionEvent): Promise<void> | void {
        console.log(`Subscribed to "${this.name}" 🎉`)
    }

    /**
     * Unsubscribes a user from the channel.
     */
    unsubscribe(event: ConnectionEvent): Promise<void> | void {
        console.log(`Unsubscribed to "${this.name}" 👋`)
    }


    /**
     * Publishes a message to the channel.
     */
    publish(message: ChannelMessage): Promise<boolean> | boolean {
        return true
    }
}
