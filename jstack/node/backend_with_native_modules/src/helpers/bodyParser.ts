import { IncomingMessage } from "http";

export function bodyParser (request: IncomingMessage, callbackFn: () => void) {
    let body = '';

    request.on('data', (chunk) => {
        body += chunk;
    })

    request.on('end', () => {
        body = JSON.parse(body);
        // @ts-ignore
        request.body = body
        console.log(body)
        callbackFn()
    })
}