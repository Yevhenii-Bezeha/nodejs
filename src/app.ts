import express, { Application, Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import postApi from "./api/postApi";

const app: Application = express();

const formatsLogger: "dev" | "short" =
  app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/contacts", postApi);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: Error, req: Request, res: Response) => {
  const { message = "Server error" } = err;
  const status: number = 500;
  res.status(status).json(message);
});

export default app;
