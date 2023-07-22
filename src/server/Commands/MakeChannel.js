const { Prop } = require('@formidablejs/console')
const { MakeResourceCommand } = require('@formidablejs/framework/lib/Foundation/Console/Commands/MakeResourceCommand')
const Channel = require('./Channel')

module.exports = class MakeChannel extends MakeResourceCommand {
    /**
     * @inheritDoc
     */
    get signature() {
        return 'make:channel {name} {?--domain}'
    }

    /**
     * @inheritDoc
     */
    get props() {
        return {
            name: Prop.string().description('The name of the interface'),
            domain: Prop.string().nullable().description('Domain name')
        }
    }

    /**
     * @inheritDoc
     */
    get description() {
        return 'Create a new channel'
    }

    /**
     * @inheritDoc
     */
    get resource() {
        return 'Channel'
    }

    /**
     * @inheritDoc
     */
    get stub() {
        return new Channel(this.argument('name'), {
            domain: this.option('domain', null)
        }, 'channel', this.language.toLowerCase())
    }
}
