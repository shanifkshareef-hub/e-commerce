import express, { Request, Response } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import router from "./api";
import mongoose from "mongoose";
import config from "./config";
import { isCelebrateError } from "celebrate";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// set up morgan middleware
app.use(morgan("tiny"));

const server = http.createServer(app);

const port = config.port ?? 8080;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const MONGO_URL = config.dataBaseUrl; // DB URI

mongoose.set("strictQuery", false);
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/v1", router());

// catch 404
app.use((req, res) => {
  return res.status(404).json({
    status: false,
    message: `${req.method} at ${req.path} not found`,
  });
});

app.use(function errorMiddleware(
  error: any,
  _request: any,
  response: any,
  _next: (err: any) => any
) {
  let stack = process.env.NODE_ENV === "production" ? {} : error.stack;

  if (isCelebrateError(error)) {
    return response.status(400).json({
      status: false,
      message: "Invalid request",
      errors:
        (error.details.has("body") &&
          error.details.get("body").details.map((err) => err.message)) ||
        (error.details.has("params") &&
          error.details.get("params").details.map((err) => err.message)) ||
        (error.details.has("query") &&
          error.details.get("query").details.map((err) => err.message)) ||
        "input validation failed",
      stack,
      code: 400,
    });
  }

  return response.status(error.httpCode || 500).json({
    status: false,
    message: error.message || "internal server error",
    stack,
  });
});

app.use((error: any, _req: Request, res: Response, _next: any) => {
  return res.json({
    status: false,
    message: error.message || "internal server error",
  });
});
