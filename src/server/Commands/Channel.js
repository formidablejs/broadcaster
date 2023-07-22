const { Stub } = require('@formidablejs/stubs')
const path = require('path')

module.exports = class Channel extends Stub {
    /**
     * Get the extension for the stub.
     *
     * @returns {string}
     */
    get ext() {
        return this.language == 'imba'
            ? '.imba'
            : (this.language == 'typescript' ? '.ts' : '.imba')
    }

    /**
     * @inheritdoc
     */
    get props() {
        return {
            domain: {
                type: String,
                required: false
            }
        }
    }

    /**
     * @inheritDoc
     */
    get stub() {
        const file = path.join(__dirname, '..', '..', '..', 'formidable', 'stubs', 'channel' + this.ext)

        return file
    }

    /**
     * @inheritDoc
     */
    get fileName() {
        return this.realClassName + this.ext
    }

    /**
     * @inheritDoc
     */
    get destination() {
        if (this.options.domain) {
            return `app/Domain/${this.options.domain}/Broadcasting`
        }

        return 'app/Broadcasting'
    }
}
