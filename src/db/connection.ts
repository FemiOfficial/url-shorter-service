import "dotenv/config";
import mongoose from "mongoose";
import Logger from "../utils/logger";
import Obj from "../types/Obj";
import { DATABASE_URL, NODE_ENV } from "../consts";

const logger = new Logger("db:connection/mongo");
export default class Mongo {
  public configObject: Obj;


  constructor() {
    this.configObject = {
        DATABASE_URL,
        options: {
          keepAlive: true,
          keepAliveInitialDelay: 300000,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        },
    };
  }

  public getConfig() {
    return this.configObject;
  }
}

/** connection mongodb */
mongoose.Promise = global.Promise;
const config = new Mongo();
const dbConfig = config.getConfig();
mongoose.connect(dbConfig.DATABASE_URL, dbConfig.options, (err) => {
  if (err) logger.log(err.message);
  else {
    logger.log(
      `Connected to mongodb successfully on ${NODE_ENV} ${dbConfig.DATABASE_URL}`
    );
  }
});
