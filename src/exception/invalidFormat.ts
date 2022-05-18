import { HTTP } from "../consts";

export class InvalidFormatException extends Error {
  status: number;

  constructor(message: string) {
    super();
    this.name = "SHORTURL_CONFLICT";
    this.message = message;
    this.status = HTTP.INVALID_FORMAT;
  }
}
