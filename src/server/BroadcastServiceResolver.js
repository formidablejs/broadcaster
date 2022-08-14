const { ServiceResolver } = require('@formidablejs/framework')

module.exports = class BroadcastServiceResolver extends ServiceResolver {
    /**
     * Boot broadcast service resolver.
     *
     * @return {void}
     */
    boot() {
        this.app.register(require('./routes'))
    }
}
