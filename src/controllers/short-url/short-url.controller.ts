import { Request, Response } from "express";
import {
  IShortUrlController,
  IShortUrlService,
} from "../../types/short-url.types";
import { HTTP } from "../../consts";
import { ConflictException } from "../../exception/conflict";
import { NotFoundException } from "../../exception/notFound";

export const ShortUrlController = (
  shortUrlService: IShortUrlService
): IShortUrlController => {
  return {
    async createShortUrl(req: Request, res: Response) {
      const shortcodeResult = await shortUrlService.createShortUrl(req.body);

      if (shortcodeResult === false)
        throw new ConflictException("Short Code Already in use");

      return res.status(HTTP.CREATED).json({ shortcode: shortcodeResult });
    },
    async getShortUrl(req: Request, res: Response) {
      const url = await shortUrlService.getShortUrl(req.params.shortcode);
      if (!url)
        throw new NotFoundException(
          "Could not fetch url for shortcode " + req.params.shortcode
        );
      return res.status(HTTP.OK).header({ Location: url.url }).json();
    },
    async getShortUrlStats(req: Request, res: Response) {
      const urlStats = await shortUrlService.getShortUrlStats(
        req.params.shortcode
      );

      if (!urlStats)
        throw new NotFoundException(
          "Could not fetch stats for shortcode " + req.params.shortcode
        );

      return res.status(HTTP.OK).json(urlStats);
    },
  };
};
