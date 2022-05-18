import type { NextFunction, Request, Response } from "express";

export type IShortUrl = {
  shortcode: string;
  url: string;
  startDate: Date;
  lastSeenDate: Date;
  redirectCount: number;
};

export type IShortUrlController = {
  createShortUrl: (req: Request, res: Response, next: NextFunction) => void;
  getShortUrl: (req: Request, res: Response, next: NextFunction) => void;
  getShortUrlStats: (req: Request, res: Response, next: NextFunction) => void;
};

export type IShortUrlService = {
  createShortUrl: (shorturl: IShortUrl) => Promise<string | false | undefined>;
  getShortUrl: (shortcode: string) => Promise<IShortUrl | null>;
  getShortUrlStats: (shortcode: string) => Promise<IShortUrl | null>;
};

export type AsyncShortUrlRepository = {
  add: (shorturl: IShortUrl) => Promise<IShortUrl | undefined>;
  getUrlByShortcode: (shortcode: string) => Promise<IShortUrl | null>;
  getShortcodeStats: (shortcode: string) => Promise<IShortUrl | null>;
  updateUrlStats: (shortcode: string) => Promise<boolean>;
};
