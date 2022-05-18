import express from "express";
import { validCreateRequest } from "../middlewares/request";

import type { IShortUrlController } from "../types/short-url.types";

export const createShortUrlRouter = (
  shortUrlController: IShortUrlController
) => {
  const shortUrlRouter = express.Router();

  shortUrlRouter.get("/:shortcode", shortUrlController.getShortUrl);
  shortUrlRouter.post("/shorten", validCreateRequest, shortUrlController.createShortUrl);
  shortUrlRouter.get("/:shortcode/stats", shortUrlController.getShortUrlStats);
  return shortUrlRouter;
};
