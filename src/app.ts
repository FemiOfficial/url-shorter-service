import "express-async-errors";
import express from "express";

import { createShortUrlRouter } from "./routers/short-url.router";
import { serverErrorHandler } from "./utils/error";

import type { IShortUrlController } from "./types/short-url.types";

export const appFactory = (
  shortUrlController: IShortUrlController,
  cors: any
) => {
  const app = express();
  const shortUrlRouter = createShortUrlRouter(shortUrlController);

  app.use(cors);

  app.use(express.json());
  app.use(shortUrlRouter);

  // app.use(notFoundHandler);
  app.use(serverErrorHandler);

  return app;
};
