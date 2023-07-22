import { ChannelMessage } from '../../types/ChannelCallback'
import ConnectionEvent from '../../types/ConnectionEvent'

export interface IBroadcastChannel {
    new (name: string): {
        publish: (message: ChannelMessage) => Promise<boolean> | boolean
    }
}

export default class BroadcastChannel {
    /**
     * The channel name.
     */
    readonly name: string

    /**
     * Instiantiates a new BroadcastChannel.
     */
    constructor(name: string)

    /**
     * Subscribes a user to the channel.
     *
     * @description This method is called when a user subscribes to the channel.
     */
    subscribe(event: ConnectionEvent): any

    /**
     * Unsubscribes a user from the channel.
     *
     * @description This method is called when a user unsubscribes from the channel.
     */
    unsubscribe(event: ConnectionEvent): any


    /**
     * Publishes a message to the channel.
     *
     * @description This method is called to verify if a user can publish a message to the channel.
     */
    publish(message: ChannelMessage): Promise<boolean> | boolean
}
