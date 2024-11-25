import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./routes/index.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(routes);

app.use((error: any, request: Request, response: Response, _: NextFunction) => {
  response.status(500).json({ message: error.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`running at ${PORT} `));
