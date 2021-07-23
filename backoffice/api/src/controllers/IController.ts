import { Router } from "express";

interface IController {
  router: Router;
  initRoutes(): any;
}

export default IController