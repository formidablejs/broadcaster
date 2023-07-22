module.exports = class BroadcastChannel {
    /**
     * @type {string} name
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * @param {import('../../types/ConnectionEvent').default} event
     */
    subscribe(event) {

    }

    /**
     * @param {import('../../types/ConnectionEvent').default} event
     */
    unsubscribe(event) {
        //
    }

    /**
     * @param {import('../../types/ChannelCallback').ChannelMessage} message
     * @returns {boolean | Promise<boolean>}
     */
    publish(message) {
        return true
    }
}
