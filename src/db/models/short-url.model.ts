import mongoose from "mongoose";

export interface IShortUrl extends mongoose.Document {
  shortcode: string;
  url: string;
  startDate: Date;
  lastSeenDate: Date;
  redirectCount: number;
}

const mShortUrlSchema = new mongoose.Schema(
  {
    shortcode: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: new Date(), // defaults to current date
    },
    lastSeenDate: {
      type: Date,
      default: null,
    },
    redirectCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ShortUrl = mongoose.model<IShortUrl>("ShortUrl", mShortUrlSchema);

export default ShortUrl;
