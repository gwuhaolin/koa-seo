'use strict';
const fs = require('fs');
const assert = require('assert');
const request = require('request');
const cheerio = require('cheerio');
const { start, stop } = require('./server');
const URL = 'http://localhost:3000';

function get(ua) {
  return new Promise((resolve, reject) => {
    request({
      url: URL,
      headers: {
        'User-Agent': ua
      }
    }, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        try {
          const $ = cheerio.load(body);
          const data = $('#app')[0].children[0].data;
          resolve(data);
        } catch (err) {
          reject(err);
        }
      }
    });
  });
}

describe('koa-seo', function () {
  this.timeout(5000);

  beforeEach(async function () {
    await start();
  });

  afterEach(async function () {
    await stop();
  });

  it('user visit', async function () {
    const content = await get('User-Agent	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4');
    assert.equal(content, 'You are not a crawler, I will be ready after 1S');
  });

  it('SE spider visit', async function () {
    const content = await get('Baiduspider-news');
    assert.equal(content, 'Im ready now');
  });

});
