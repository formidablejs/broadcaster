import { IMiddleware, ServiceResolver } from '@formidablejs/framework'

export default class BroadcastServiceResolver extends ServiceResolver {
    /**
     * Get the prefix for the broadcast routes.
     */
    getPrefix(): string

    /**
     * Get the middleware for the broadcast routes.
     */
    getMiddleware(): string | IMiddleware[]
}
