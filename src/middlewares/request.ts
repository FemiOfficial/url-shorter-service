import { NextFunction, Response, Request } from "express";
import { BadRequestException } from "../exception/badRequest";
import { InvalidFormatException } from "../exception/invalidFormat";

export const validCreateRequest = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!("url" in request.body))
    throw new BadRequestException("url is required");

  if ("shortcode" in request.body) {
    if (!request.body.shortcode.match(/^[0-9a-zA-Z_]{4,}$/))
      throw new InvalidFormatException(
        "short code does not match specified regex pattern (^[0-9a-zA-Z_]{4,}$)"
      );
  }

  next();
};
