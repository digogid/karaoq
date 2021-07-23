import express from "express";
import { Application } from "express";
import IController from "./controllers/IController";

class App {
  private app: Application;
  private port: number;

  constructor(appInit: { port: number; controllers: any; middlewares: any }) {
    this.app = express();
    this.port = appInit.port;
    this.registerMiddlewares(appInit.middlewares);
    this.registerRoutes(appInit.controllers);
  }

  private registerMiddlewares(middleWares: []) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private registerRoutes(controllers: Array<IController>) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
