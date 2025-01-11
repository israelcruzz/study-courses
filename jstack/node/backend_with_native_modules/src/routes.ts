import { IncomingMessage } from "node:http";
import UserController from "./controllers/user.controller";
import { HttpResponse } from "./@types/response";

type HttpMethods = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

type Route = {
    endpoint: string;
    method: HttpMethods;
    handler: (request: IncomingMessage, response: HttpResponse) => void
}

export const routes: Route[] = [
    {
        endpoint: "/users",
        method: "GET",
        handler: UserController.getAll
    },
    {
        endpoint: "/users/:id",
        method: "GET",
        handler: UserController.getUser
    },
    {
        endpoint: "/users",
        method: "POST",
        handler: UserController.store
    },
    {
        endpoint: "/users/:id",
        method: "PUT",
        handler: UserController.update
    },
    {
        endpoint: "/users/:id",
        method: "DELETE",
        handler: UserController.delete
    },
]