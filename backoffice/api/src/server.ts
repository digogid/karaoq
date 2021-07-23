import * as bodyParser from "body-parser";
import { config } from "dotenv";
import { join } from "path";
const path = require("path");

const configPath = join(path.resolve(__dirname), "./config", `.env`);
config({ path: configPath });

import App from "./app";
import CancaoController from "./controllers/CancaoController";
import MesaController from "./controllers/MesaController";

const app = new App({
  port: 8088,
  controllers: [CancaoController, MesaController],
  middlewares: [
    bodyParser.json(), 
    bodyParser.urlencoded({ extended: true })
  ]
});

app.listen();
