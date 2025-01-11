import { IncomingMessage } from "node:http";
import { HttpResponse } from "../@types/response";
import { users } from "../mocks/user";

class UserController {
    getAll(request: IncomingMessage, response: HttpResponse) {
        // @ts-ignore
        const { order } = request.query

        const sortedUsers = users.sort((a, b) => {
            if (order === "asc") {
                return a.id > b.id ? 1 : -1
            }

            return a.id < b.id ? 1 : -1
        })

    
        // @ts-ignore
        response.send(200, sortedUsers)
    }

    getUser(request: IncomingMessage, response: HttpResponse) {
        // @ts-ignore
        const id: number = request.params.id;

        const userFiltered = users.find((user) => user.id === id)

        if (!userFiltered) {
            // @ts-ignore
            response.send(400, { message: "User Not Found" })
        }

        // @ts-ignore
        response.send(200, userFiltered)
    }

    store(request: IncomingMessage, response: HttpResponse) {
        // @ts-ignore
        const { name } = request.body;

        if (!name) {
        // @ts-ignore
        response.send(400, { message: "Invalid Payload" })
        }

        users.push({
            id: users[users.length - 1].id + 1,
            name
        })

        // @ts-ignore
        response.send(200, users)
    }

    delete(request: IncomingMessage, response: HttpResponse) {
        // @ts-ignore
        const id: number = request.params.id;

        const filterUsers = users.filter((user) => user.id !== id)

        // @ts-ignore
        response.send(200, filterUsers)
    }

    update(request: IncomingMessage, response: HttpResponse) {
        // @ts-ignore
        const id: number = request.params.id;

        // @ts-ignore
        const name = request.body.name;

        const updateUsers = users.map((user) => {
            if (user.id === id) {
                return { ...user, name: name }
            }

            return user
        })

        // @ts-ignore
        response.send(200, updateUsers)
    }
}

export default new UserController()