import * as dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

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
 * 2. Instead of reversing text, call the google translate API (or free version)
 */

app.post("/translate/", (req: Request, res: Response) => {
  const { inputLanguage, outputLanguage, text } = req.body;
  console.log("Hit the backend with " + text);
  return res.status(200).json({ data: text.split("").reverse().join("") });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
