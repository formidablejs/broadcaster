const config = globalThis.BroadcastConfig || {}

/**
 * Get the prefix for the broadcast routes.
 *
 * @returns {string}
 */
const getPrefix = () => {
    return (config.prefix || '_broadcast').replace(/\/$/, '').replace(/^\//, '')
}

/**
 * Subscribe to channel.
 *
 * @param {string} channel
 * @param {import('../../types/SubscriptionOptions').default} options
 */
module.exports = (channel, options) => {
    let payload = null

    const source = new EventSource(`/${getPrefix()}/${channel}`, {
        withCredentials: true,
    })

    source.onmessage = (event) => {
        if (event.data !== payload) {
            payload = event.data
            options.onMessage(JSON.parse(payload).payload)
        }
    }

    if (options.onError && typeof options.onError === 'function') {
        source.onerror = (e) => {
            options.onError(e, source)
        }
    } else {
        source.onerror = (e) => {
            source.close()

            throw new Error("An error occurred while establishing a connection to the server")
        }
    }

    if (options.onReady && typeof options.onReady === 'function') {
        source.onopen = (e) => {
            if (e.target.readyState == EventSource.OPEN) {
                options.onReady(e, source)
            }
        }
    }

    return source
}
