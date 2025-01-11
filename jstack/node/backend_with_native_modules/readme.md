# Node.js API Project

This project demonstrates how to create a simple API using only native Node.js modules. It focuses on understanding the process of setting up an API server and handling HTTP requests manually, without relying on external frameworks like Express.

## Project Structure

```bash
├── node_modules
└── src
    ├── @types
    ├── controllers
    ├── helpers
    └── mocks
```

- **node_modules**: Contains the installed dependencies for the project.
- **src**: Contains the source code files of the project.
  - **@types**: TypeScript types for custom response handling.
  - **controllers**: Contains controller files for handling business logic.
  - **helpers**: Contains utility files, such as the `bodyParser` for handling request bodies.
  - **mocks**: Contains mock data or files used for testing purposes.

## Dependencies

### devDependencies

- `@types/node`: TypeScript definitions for Node.js, allowing for better type support.
- `tsx`: A tool to run TypeScript code directly without needing a compilation step.
- `typescript`: The TypeScript compiler and runtime.

```json
"devDependencies": {
  "@types/node": "^22.10.5",
  "tsx": "^4.19.2",
  "typescript": "^5.7.3"
}
```

## Project Setup

1. Install dependencies:

```bash
pnpm install
```

2. To run the project, use the following command:

```bash
pnpm start
```

3. The server will run on `http://localhost:3000`.

## Routes

The API exposes several routes to perform CRUD operations on users.

- **GET /users**: Retrieve all users.
- **GET /users/:id**: Retrieve a specific user by ID.
- **POST /users**: Create a new user.
- **PUT /users/:id**: Update an existing user by ID.
- **DELETE /users/:id**: Delete a user by ID.

These routes are defined in the `routes.ts` file and handled by the `UserController`.

## HTTP Request Handling

The API server is built using Node.js's native HTTP modules. The server listens for incoming requests and matches them with the defined routes.

- **createServer**: Creates an HTTP server that listens for requests.
- **routes**: A set of predefined routes that map HTTP methods (GET, POST, PUT, DELETE) to their respective handlers in `UserController`.
- **bodyParser**: A helper function that parses the request body for POST, PUT, and PATCH requests.

### Example of a request handler (in `user.controller.ts`):

```typescript
class UserController {
  static getAll(request: IncomingMessage, response: HttpResponse) {
    // Logic to get all users
  }

  static getUser(request: IncomingMessage, response: HttpResponse) {
    // Logic to get a user by ID
  }

  static store(request: IncomingMessage, response: HttpResponse) {
    // Logic to store a new user
  }

  static update(request: IncomingMessage, response: HttpResponse) {
    // Logic to update an existing user
  }

  static delete(request: IncomingMessage, response: HttpResponse) {
    // Logic to delete a user
  }
}
```

### Example of server setup:

```typescript
import { createServer } from "node:http";
import { routes } from "./routes";
import { URL } from "node:url";
import { bodyParser } from "./helpers/bodyParser";
import { HttpResponse } from "./@types/response";

const server = createServer((request, response) => {
  const parsedUrl = new URL(`https://localhost:3000${request.url}`);
  let { pathname } = parsedUrl;
  let id: null | number = null;

  const splitEndpoint = pathname.split("/").filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = parseInt(splitEndpoint[1]);
  }

  const route = routes.find((route) => route.endpoint === pathname && route.method === request.method);

  response.send = (statusCode: number, responseEnd) => {
    response.writeHead(statusCode, { "Content-Type": "application/json" });
    response.end(JSON.stringify(responseEnd));
  };

  console.log(`REQUEST URL: ${pathname} | REQUEST METHOD: ${request.method} - ${route}`);

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    if (['POST', 'PUT', 'PATCH'].includes(request.method as string)) {
      bodyParser(request, () => route.handler(request, response as HttpResponse));
    } else {
      route.handler(request, response as HttpResponse);
    }
  } else {
    response.send(400, { message: "Internal Server Error" });
    console.log("Route not found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

## Testing

You can use tools like **Postman** or **Insomnia** to test the API endpoints. Here's how you can test them:

1. **GET /users**: Retrieve all users.
2. **GET /users/:id**: Retrieve a user by ID (replace `:id` with a valid user ID).
3. **POST /users**: Send a JSON body with user data to create a new user.
4. **PUT /users/:id**: Update a user by ID (replace `:id` with a valid user ID and send a JSON body with updated data).
5. **DELETE /users/:id**: Delete a user by ID.

## License

This project is open-source and available under the [MIT License](LICENSE).