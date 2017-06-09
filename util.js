const CrawlerUserAgents = [
    'googlebot',
    'yahoo',
    'bingbot',
    'baiduspider',
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
];

function isCrawler(userAgent) {
    for (let i = 0; i < CrawlerUserAgents.length; i++) {
        const keyword = CrawlerUserAgents[i];
        if (userAgent.indexOf(keyword) >= 0) {
            return true;
        }
    }
    return false;
}

module.exports = {
    isCrawler,
}