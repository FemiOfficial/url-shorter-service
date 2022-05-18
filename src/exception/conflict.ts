import { HTTP } from "../consts";

export class ConflictException extends Error {
  status: number;

  constructor(message: string) {
    super();
    this.name = "SHORTURL_CONFLICT";
    this.message = message;
    this.status = HTTP.CONFLICT;
  }
}
