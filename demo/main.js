'use strict';
const Koa = require('koa');
const serve = require('koa-static');
const seoMiddleware = require('../index');
const app = new Koa();

app.use(seoMiddleware({
    render: {
        // chrome-render #render() method ready option
        ready: '_page_ready',
    }
}));

app.use(serve(__dirname));

app.listen(3000);
