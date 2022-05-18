import { Console } from "console";
import {
  AsyncShortUrlRepository,
  IShortUrl,
  IShortUrlService,
} from "../../types/short-url.types";
import { generateShortCode } from "../../utils/generateShortCode";

export class ShortUrlService implements IShortUrlService {
  private readonly shortUrlRepository;
  constructor(shortUrlRepository: AsyncShortUrlRepository) {
    this.shortUrlRepository = shortUrlRepository;
  }

  private async generateUniqueShortCode() {
    let shortCode = generateShortCode();
    let foundShortcode = await this.shortUrlRepository.getUrlByShortcode(shortCode);

    while (foundShortcode) {
      shortCode = generateShortCode();
      foundShortcode = await this.shortUrlRepository.getUrlByShortcode(shortCode);
    } 

    return shortCode;
  }

  public async createShortUrl(shorturl: IShortUrl) {
    // ensure shortcode sent is not in use

    let shortCode = "";
    if ("shortcode" in shorturl) {
      const isExisiting = await this.shortUrlRepository.getUrlByShortcode(
        shorturl?.shortcode as string
      );

      if (isExisiting) return false;
      shortCode = shorturl?.shortcode;
    } else {
      shortCode = await this.generateUniqueShortCode();
    }

    const data: IShortUrl = {
      url: shorturl?.url as string,
      shortcode: shortCode,
    } as IShortUrl;

    const dbResult = await this.shortUrlRepository.add(data);
    return dbResult?.shortcode;
  }
  public async getShortUrl(shortcode: string) {
    const url = await this.shortUrlRepository.getUrlByShortcode(shortcode);
    await this.shortUrlRepository.updateUrlStats(shortcode);
    return url;
  }
  public async getShortUrlStats(shortcode: string) {
    return await this.shortUrlRepository.getShortcodeStats(shortcode);
  }
}
