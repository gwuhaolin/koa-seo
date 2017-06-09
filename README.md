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

### chrome-render options
- `maxTab`: `number` max tab chrome will open to render pages, default is no limit, `maxTab` used to avoid open to many tab lead to chrome crash. `ChromeRender` will create a tab poll to reuse tab for performance improve and resource reduce as open and close tab in chrome require time, like database connection poll. 
- `renderTimeout`: `number` in ms, `chromeRender.render()` will throw error if html string can't be resolved after `renderTimeout`, default is 5000ms.
- `ready`: `string` is an option param. if it's omitted chrome will return page html on dom event `domContentEventFired`, else will waiting util js in web page call `console.log(${ready's value})`. et `ready=_ready_flag` when web page is ready call `console.log('_ready_flag')`.
- `script`: `string` is an option param. inject script source to evaluate when page on load

### redis cache options
options `cache` is not required, if it's omitted will not use cache.
`cache` is a object, is support all params in [node redis driver](https://github.com/NodeRedis/node_redis#options-object-properties),
and below:
- `expires`: `number` cache expires time in seconds, if omitted cache forever
