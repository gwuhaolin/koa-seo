[![Npm Package](https://img.shields.io/npm/v/koa-seo.svg?style=flat-square)](https://www.npmjs.com/package/koa-seo)
[![Build Status](https://img.shields.io/travis/gwuhaolin/koa-seo.svg?style=flat-square)](https://travis-ci.org/gwuhaolin/koa-seo)
[![Npm Downloads](http://img.shields.io/npm/dm/koa-seo.svg?style=flat-square)](https://www.npmjs.com/package/koa-seo)
[![Dependency Status](https://david-dm.org/gwuhaolin/koa-seo.svg?style=flat-square)](https://npmjs.org/package/koa-seo)

# koa-seo
SEO middleware for koa base on [chrome-render](https://github.com/gwuhaolin/chrome-render), a substitute for [prerender](https://prerender.io).

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/3bvxELAxnq8r4wheFyRkED8U/gwuhaolin/koa-seo'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/3bvxELAxnq8r4wheFyRkED8U/gwuhaolin/koa-seo.svg' />
</a>

Modern web app use technique like react.js vue.js which render html in browser, this lead to search engine can't crawl your page content.

This project want to solve this kind of problem in a general-purpose way, it detect request is from search engine crawler then use headless chrome to render out your modern web page and return to crawler.

Here is koa-seo's architecture diagram:
![koa-seo arch](./doc/koa-seo%20arch.png)

## Use
```bash
npm i koa-seo
```
then use it:
```js
const Koa = require('koa');
const seoMiddleware = require('koa-seo');
const app = new Koa();

app.use(seoMiddleware({
    render: {
        // use `window.isPageReady=1` to notify chrome-render page has ready
        useReady: true,
    }
}));

app.listen(3000);
```
you can download and run this [complete demo](test/server.js)

## Options
- `render` options from [koa-chrome-render](https://github.com/gwuhaolin/koa-chrome-render#render-options)

For more flexible use case see [koa-chrome-render](https://github.com/gwuhaolin/koa-chrome-render).

## Friends
- koa-seo dependent on [koa-chrome-render](https://github.com/gwuhaolin/koa-chrome-render) chrome-render middleware for koa.
- [chrome-render](https://github.com/gwuhaolin/chrome-render) general server render base on chrome.
- [chrome-pool](https://github.com/gwuhaolin/chrome-pool) Headless chrome tabs manage pool.
- [express-middleware-seo](https://github.com/Binaryify/express-middleware-seo) SEO middleware for express base on [chrome-render](https://github.com/gwuhaolin/chrome-render)
