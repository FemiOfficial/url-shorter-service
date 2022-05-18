import '../src/db/connection';
import ShortUrl from '../src/db/models/short-url.model';

before(async () => {
    await ShortUrl.deleteMany({});
});