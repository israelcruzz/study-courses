import { createServer } from "node:http"
import { routes } from "./routes"
import { URL } from "node:url";
import { bodyParser } from "./helpers/bodyParser";
import { HttpResponse } from "./@types/response";

const server = createServer((request, response) => {
    const parsedUrl = new URL(`https://localhost:3000${request.url}`)

    let { pathname } = parsedUrl
    let id: null | number = null

    const splitEndpoint = pathname.split("/").filter(Boolean)

    if (splitEndpoint.length > 1) {
        pathname = `/${splitEndpoint[0]}/:id`
        id = parseInt(splitEndpoint[1])
    }

    const route = routes.find((route) => route.endpoint === pathname && route.method === request.method);

    // @ts-ignore
    response.send = (statusCode: number, responseEnd) => {
        response.writeHead(statusCode, { "Content-Type": "application/json" });
        response.end(JSON.stringify(responseEnd));
    }

    console.log(`REQUEST URL: ${pathname} | REQUEST METHOD: ${request.method} - ${route}`)

    if (route) {
        // @ts-ignore
        request.query = Object.fromEntries(parsedUrl.searchParams)
        // @ts-ignore
        request.params = { id }

        if(['POST', 'PUT', 'PATCH'].includes(request.method as string)) {
            bodyParser(request, () => route.handler(request, response as HttpResponse))
        } else {
            route.handler(request, response as HttpResponse);
        }
    } else {
        // @ts-ignore
        response.send(400, { message: "Internal Server Error" })
    }
})

server.listen(3000)
