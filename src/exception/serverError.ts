import { HTTP } from "../consts";

export class ServerErrorException extends Error {
  status: number;

  constructor(message: string) {
    super();
    this.name = "INTERNAL_SERVER_ERROR";
    this.message = message;
    this.status = HTTP.SERVER_ERROR;
  }
}
