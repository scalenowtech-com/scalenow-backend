import compression from "compression";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { PORT } from "./config";

import { router as contactRouter } from "./contact/routes";

const app = express();

app.use(compression());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(morgan("[:date[web]] :method :url :status :response-time ms"));

export async function init() {
  try {
    console.log("init");
    initRouter();
    initServer();
  } catch (err: any) {
    console.error("Unable to initialize app: ", err.message);
  }
}

async function initServer() {
  app.listen(PORT, () => {
    console.info(`server is running at http://localhost:${PORT}`);
  });
}

async function initRouter() {
  app.get("/healthCheck", (_, res) => {
    res.json({
      data: {
        message: `Server connected to PORT:${PORT}!`,
      },
      error: null,
    });
  });

  app.use("/contact", contactRouter);
}

init();
