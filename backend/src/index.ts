import * as dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { translateText } from "./util/ApiCalls";

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
 * 2. Instead of reversing text, call the google translate API (or free version)
 */

app.post("/translate/", async (req: Request, res: Response) => {
  const { inputLanguage, outputLanguage, text } = req.body;
  const translated_text = await translateText(
    inputLanguage,
    outputLanguage,
    text
  );
  try {
    res.status(200).json({ data: translated_text });
  } catch (e: any) {
    const errorMsg = `Failed to translate from ${inputLanguage} to ${outputLanguage}. ${e.message}`;
    console.error(errorMsg);
    return res.status(500).json({
      message: errorMsg,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
