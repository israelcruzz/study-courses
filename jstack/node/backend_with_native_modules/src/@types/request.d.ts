import { IncomingMessage } from "node:http";

type HttpRequest = typeof IncomingMessage & {
    query: any;
    params: any;
}