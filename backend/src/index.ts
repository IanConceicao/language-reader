import * as dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { RegistrableController } from "./controllers/RegistrableController";
import container from "./inversify.config";
import TYPES from "./types";

dotenv.config();
const PORT = process.env.BACKEND_PORT || 8000;

const app: Application = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Healthy");
});

/**
 * TODO:
 * 1. Move ports to environment variables? Or look into whats proper
 */

const controllers: RegistrableController[] =
  container.getAll<RegistrableController>(TYPES.Controller);
controllers.forEach((controller) => controller.register(app));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
