[![Npm Package](https://img.shields.io/npm/v/koa-seo.svg?style=flat-square)](https://www.npmjs.com/package/koa-seo)
[![Npm Downloads](http://img.shields.io/npm/dm/koa-seo.svg?style=flat-square)](https://www.npmjs.com/package/koa-seo)
[![Dependency Status](https://david-dm.org/gwuhaolin/koa-seo.svg?style=flat-square)](https://npmjs.org/package/koa-seo)

# koa-seo
SEO middleware for koa base on [chrome-render](https://github.com/gwuhaolin/chrome-render).

Modern web app use technique like react.js vue.js which render html in browser, this lead to search engine can't crawl your page content.

This project want to solve this kind of problem in a general-purpose way, it detect request is from search engine crawler then use headless chrome to render out your modern web page and return to crawler.
koa-seo also support redis cache to improve performance.

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
        // chrome-render #render() method ready option
        ready: '_page_ready',
    },
    cache: {
        // redis address
        host: '127.0.0.1',
        port: 6379,
        // cache expires time after 10 seconds, if omitted cache forever
        expires: 10,
    },
}));

app.listen(3000);
```
you can download and run this [complete demo](./demo/main.js)

## Options
- `render` options from [koa-chrome-render](https://github.com/gwuhaolin/koa-chrome-render#render-options)
- `cache` options from [koa-chrome-render](https://github.com/gwuhaolin/koa-chrome-render#cache-options)

