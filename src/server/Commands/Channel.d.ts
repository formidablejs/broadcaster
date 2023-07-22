export default class Channel {
    className: string
    options: any
    stubName: string
    language: string
    stubPath: string
    stubContents: any

    /**
     * @param {string} name
     * @param {object} options
     * @param {string} stubName
     * @param {string} language
     */
    constructor(name: string, options: object, stubName: string, language?: string)

    /**
     * Get the extension for the stub.
     */
    get ext(): string

    /**
     * Stub properties.
     *
     * @returns {object}
     */
    get props(): any

    /**
     * Get stub location.
     *
     * @returns {String}
     */
    get stub(): string

    /**
     * Stub data.
     *
     * @returns {object}
     */
    get data(): any

    /**
     * Stub contents.
     *
     * @returns {string}
     */
    get contents(): string

    /**
     * File destination.
     *
     * @returns {string}
     */
    get destination(): string

    /**
     * File name from class name.
     *
     * @returns {string}
     */
    get fileName(): string

    /**
     * Real path.
     *
     * @returns {string}
     */
    get realPath(): string

    /**
     * Class/file namespace.
     *
     * @returns {string}
     */
    get namespace(): string

    /**
     * Class name without the namespace.
     *
     * @returns {string}
     */
    get realClassName(): string

    /**
     * Get make information.
     *
     * @return {object}
     */
    make(): object
}
