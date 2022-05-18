import assert from 'assert';
import supertest from 'supertest';

import app from '../src/createApp';

import { HTTP } from '../src/consts';

const request = supertest(app);

describe('Books', () => {
  let usedShortcode = ""
  it('create url shortcode', async () => {
    const urlResult = await request
      .post('/shorten')
      .set('Accept', 'application/json')
      .send({ "url": "http://localhost:3000/short" })
      .expect(HTTP.CREATED);

    // should return a valid shortcode
  
    assert.notStrictEqual(urlResult.body.shortcode, undefined);
  });

  it('should return 409 if already existing short code is used', async () => {
    const urlResult = await request
    .post('/shorten')
    .set('Accept', 'application/json')
    .send({ "url": "http://localhost:3000/short" })
    .expect(HTTP.CREATED);

    usedShortcode = urlResult.body.shortcode;

    assert.notStrictEqual(urlResult.body.shortcode, undefined);

    const urlResult_2 = await request
    .post('/shorten')
    .set('Accept', 'application/json')
    .send({ "url": "http://localhost:3000/short", shortcode: usedShortcode  })
    .expect(HTTP.CONFLICT);
    
  });

  it('should return bad request if invalid shortccode is used ', async () => {

    await request
      .post('/shorten')
      .set('Accept', 'application/json')
      .send({ "url": "http://localhost:3000/short", shortcode: ''  })
      .expect(HTTP.BAD_REQUEST);
  });

  it('should return bad request if url is not sent ', async () => {

    await request
      .post('/shorten')
      .set('Accept', 'application/json')
      .send({ shortcode: '' })
      .expect(HTTP.BAD_REQUEST);
  });

  it('get url for valid shortcode', async () => {
    const getUrlResult = await request
      .get('/'+ usedShortcode)
      .set('Accept', 'application/json')
      .expect(HTTP.OK);

    assert.strictEqual(getUrlResult.header.location, "http://localhost:3000/short");
  });

  it('return not found 404 for invalid shortcode', async () => {
    const getUrlResult = await request
    .get('/'+ "somecode")
    .set('Accept', 'application/json')
    .expect(HTTP.NOT_FOUND);

  assert.strictEqual(getUrlResult.header.location, undefined);
  });

  it('get stats for valid shortcode', async () => {
    const getUrlResult = await request
      .get('/'+ usedShortcode + '/stats')
      .set('Accept', 'application/json')
      .expect(HTTP.OK);

    assert.notStrictEqual(getUrlResult.body.startDate, undefined);
    assert.notStrictEqual(getUrlResult.body.lastSeenDate, undefined);
    assert.notStrictEqual(getUrlResult.body.redirectCount, undefined);
    assert.strictEqual(getUrlResult.body.redirectCount, 1);
  });

  it('get stats for invalid shortcode', async () => {
   await request
      .get('/'+ "usedShortcode" + '/stats')
      .set('Accept', 'application/json')
      .expect(HTTP.NOT_FOUND);
  });

  it('get stats for newly created shortcode', async () => {

    const urlResult = await request
    .post('/shorten')
    .set('Accept', 'application/json')
    .send({ "url": "http://localhost:3000/short" })
    .expect(HTTP.CREATED);

    const getUrlResult = await request
      .get('/'+ urlResult.body.shortcode + '/stats')
      .set('Accept', 'application/json')
      .expect(HTTP.OK);

    assert.notStrictEqual(getUrlResult.body.startDate, undefined);
    assert.notStrictEqual(getUrlResult.body.lastSeenDate, undefined);
    assert.notStrictEqual(getUrlResult.body.redirectCount, undefined);
    assert.strictEqual(getUrlResult.body.redirectCount, 0);
  });


});
