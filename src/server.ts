import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./routes/index.js";

const PORT = 3333;
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

app.listen(PORT, () => console.log(`running at ${PORT} `));
