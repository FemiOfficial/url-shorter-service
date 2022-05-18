import ShortUrl from "../db/models/short-url.model";
import { AsyncShortUrlRepository, IShortUrl } from "../types/short-url.types";

export const createShortUrlRepository = (): AsyncShortUrlRepository => {
  return {
    async add(shortUrl: IShortUrl): Promise<IShortUrl | undefined> {
      return await ShortUrl.create(shortUrl);
    },
    async getUrlByShortcode(shortcode: string): Promise<IShortUrl | null> {
      return await ShortUrl.findOne({ shortcode }).select("url").lean();
    },
    async updateUrlStats(shortcode: string): Promise<boolean> {
      const url = await ShortUrl.findOne({ shortcode });
      delete url?._id;

      if (!url) return false;
      url.lastSeenDate = new Date();
      url.redirectCount += 1;
      url.save();
      return true;
    },
    async getShortcodeStats(shortcode: string): Promise<IShortUrl | null> {
      return await ShortUrl.findOne({ shortcode })
        .select("lastSeenDate redirectCount startDate -_id")
        .lean();
    },
  };
};
