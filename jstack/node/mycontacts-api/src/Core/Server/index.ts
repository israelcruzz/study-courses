import { environmentConfig } from "@/Config/EnvironmentConfig";
import { Routes } from "@/Domains/routes";
import express, { Express } from "express"

class Server {
    private app: Express = express();

    start(): void {
        this.setupHealthCheckRoute();
        this.app.use(express.json());
        this.setupRoutes();
        this.app.listen(environmentConfig.port);
    }

    private setupRoutes() {
      Routes.map((route) => this.app.use(route));
    }

    setupHealthCheckRoute() {
        this.app.get("/health-check", (_, res) => {
            res.send("🥳 Good")
        })
    }
}

export default Server;