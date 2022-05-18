import { AsyncShortUrlRepository, IShortUrlService } from "../../types/short-url.types";
import { ShortUrlController } from "./short-url.controller";
import { ShortUrlService } from "./short-url.service";

export const createShortUrlController = (shortUrlService: IShortUrlService) => {
  return ShortUrlController(shortUrlService);
};


export const createShortUrlService = (shortUrlRepository: AsyncShortUrlRepository) => {
  return new ShortUrlService(shortUrlRepository);
}