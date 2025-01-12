import { environmentConfig } from "@/Config/EnvironmentConfig";
import { isDevEnvironment } from "@/Config/IsDevEnvironment";
import { Routes } from "@/Domains/routes";
import express, { Express, NextFunction, Request, Response } from "express"
import "express-async-errors"

class Server {
    private app: Express = express();

    start(): void {
        this.setupHealthCheckRoute();
        this.app.use(express.json());
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
          if (isDevEnvironment) {
            console.log(err)
          }

          res.send(500).json({ error: "Internal Server Error" })
        })
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