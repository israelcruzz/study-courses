import { isDevEnvironment } from "@/Config/isDevEnvironment";
import Server from "@/Core/Server/index";

export class BootstrapApplication {
    private readonly server: Server;

    constructor() {
        this.server = new Server();
    }

    public async boot() {
        this.server.start();

        if (isDevEnvironment) {
            console.log(`💻 Server Running in htts://localhost:${process.env.PORT}/health-check`)
        }
    }
}