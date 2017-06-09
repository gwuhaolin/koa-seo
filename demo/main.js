'use strict';
const Koa = require('koa');
const serve = require('koa-static');
const seoMiddleware = require('../index');
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

app.use(serve(__dirname));

app.listen(3000);
