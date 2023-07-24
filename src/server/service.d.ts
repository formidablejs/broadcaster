import { FastifyReply, Request } from '@formidablejs/framework'

export default function (reply: FastifyReply, request: Request, channel: string): Promise<NodeJS.Timer>
