type BroadcastingConfig = {
    /**
     * Specify the prefix that will be used to prefix the channel
     * paths. For example, if you specify a prefix of `_broadcast`, the channel
     * path will be `/_broadcast/channel`.
     */
    prefix: string
}

export default BroadcastingConfig
