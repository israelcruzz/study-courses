import { IncomingMessage, ServerResponse } from "http";

type HttpResponse = ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
    send: (statusCode: number, responseEnd: any) => void
}
