'use strict';
const chromeRenderMiddleware = require('koa-chrome-render');

const CrawlerUserAgents = [
  'googlebot',
  'yahoo',
  'bingbot',
  'Baiduspider',// http://baidu.com/search/spider.htm
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'developers.google.com/+/web/snippet',
  'slackbot',
  'vkShare',
  'W3C_Validator',
  'redditbot',
  'Applebot',
  'WhatsApp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'SkypeUriPreview',
  'nuzzel',
  'Discordbot',
  'Google Page Speed',
  'Qwantify'
]

function isCrawler(request) {
  const userAgent = request.headers['user-agent'];
  for (let i = 0; i < CrawlerUserAgents.length; i++) {
    const keyword = CrawlerUserAgents[i];
    if (userAgent.indexOf(keyword) >= 0) {
      return true;
    }
  }
  return false;
}

function seoMiddleware(options = {}) {
  const { render } = options;

  return chromeRenderMiddleware({
    render,
    enable: isCrawler
  })
}

module.exports = seoMiddleware;

