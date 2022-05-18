import cors from 'cors';
import { getAllowedHosts, HTTP, NODE_ENV } from './consts';
import type { IShortUrlController } from './types/short-url.types';
import type { AsyncShortUrlRepository } from './types/short-url.types';
import { appFactory } from './app';
import { createShortUrlController, createShortUrlService } from './controllers/short-url';
import { createShortUrlRepository } from './repositories/short-url.repository';
import './utils/validateEnv';
import './db/connection';



const corsOptions: cors.CorsOptions = {
  origin: process.env.NODE_ENV === NODE_ENV ? getAllowedHosts() : '*',
  optionsSuccessStatus: HTTP.OK,
};

const corsMiddleware = cors(corsOptions);
const shortUrlRepository: AsyncShortUrlRepository = createShortUrlRepository();
const shortUrlService = createShortUrlService(shortUrlRepository);
const shortUrlController: IShortUrlController = createShortUrlController(
  shortUrlService
);

const app = appFactory(shortUrlController, corsMiddleware);

export default app;