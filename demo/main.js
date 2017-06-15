'use strict';
const Koa = require('koa');
const serve = require('koa-static');
const seoMiddleware = require('../index');
const app = new Koa();

app.use(seoMiddleware({
    render: {
        // use `window.chromeRenderReady()` to notify chrome-render page has ready
        useReady: true,
    }
}));

app.use(serve(__dirname));

app.listen(3000);
