import { FastifyReply, Request } from '@formidablejs/framework'

type send = (reply: FastifyReply, request: Request, channel: string) => {}

export default send
