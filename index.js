'use strict';
const ChromeRender = require('chrome-render');
const { isCrawler } = require('./util');
const Cacher = require('./cacher');

function seoMiddleware(options = {
    render: {
        // number max tab chrome will open to render pages, default is no limit, maxTab used to avoid open to many tab lead to chrome crash.
        maxTab: undefined,
        // number in ms, chromeRender.render() will throw error if html string can't be resolved after renderTimeout, default is 5000ms.
        renderTimeout: undefined,

        // string is an option param. if it's omitted chrome will return page html on dom event domContentEventFired, else will waiting util js in web page call console.log(${ready's value}). et ready=_ready_flag when web page is ready call console.log('_ready_flag')
        ready: undefined,
        // string is an option param. inject script source to evaluate when page on load
        script: undefined,
    },
    cache: undefined,
}) {
    const { render: chromeRenderOptions, cache: cacheOptions } = options;

    let cacher;
    if (cacheOptions !== undefined) {
        cacher = new Cacher(cacheOptions);
    }

    let chromeRender;
    (async () => {
        chromeRender = await ChromeRender.new(chromeRenderOptions);
    })();

    // use chrome-render render page to html string
    const render = async function (request) {
        const { href, header } = request;
        const referrer = header['referrer'];
        const cookieString = header['cookies'];
        let cookies;
        if (typeof cookieString === 'string') {
            cookies = {};
            try {
                cookieString.split('; ').forEach(em => {
                    const two = em.split('=');
                    cookies[two[0]] = cookies[two[1]];
                })
            } catch (_) {
            }
        }
        return await chromeRender.render(Object.assign({
            url: href,
            referrer,
            cookies,
        }, chromeRenderOptions));
    }

    return async function (ctx, next) {
        const { request } = ctx;
        const { header, href } = request;
        const ua = header['user-agent'];
        const is = isCrawler(ua);
        if (is) {
            // is a bot req
            let htmlString
            if (cacher === undefined) {
                // don't use cache
                htmlString = await render(request);
            } else {
                // use cache
                htmlString = await cacher.get(href);
                if (htmlString === null) {
                    htmlString = await render(request);
                    cacher.set(href, htmlString);
                }
            }
            ctx.body = htmlString;
        } else {
            await next();
        }
    }
}

module.exports = seoMiddleware;

