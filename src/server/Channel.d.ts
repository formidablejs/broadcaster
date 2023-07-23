export default class Channel {
    /**
     * Unique message identifier.
     */
    readonly id: string

    /**
     * Create a new channel instance.
     */
    constructor(message: string)

    /**
     * Create a new channel instance.
     */
    static publish(message: string): Channel

    /**
     * Publish message to channel.
     */
    on(channel: string): Promise<boolean>
}
