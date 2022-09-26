/**
 * Subscribe to channel.
 *
 * @param {string} channel
 * @param {Function} callback
 */
 module.exports = (channel, callback) => {
    let payload = null

    const source = new EventSource(`/listen/${channel}`, {
        withCredentials: true,
    })

    source.onmessage = (event) => {
        if (event.data !== payload) {
            payload = event.data
            callback(JSON.parse(payload).payload)
        }
    }

    return source
}
