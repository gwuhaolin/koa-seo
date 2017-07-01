'use strict';
const Koa = require('koa');
const seoMiddleware = require('../index');
const app = new Koa();

app.use(seoMiddleware({
  render: {
    // use `window.isPageReady=1` to notify chrome-render page has ready
    useReady: true,
  }
}));

app.use(function (ctx) {
  ctx.body = `
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <title>koa-seo middleware demo page</title>
</head>
<body style="text-align: center">
<h1 id="app">You are not a crawler, I will be ready after 1S</h1>
<script>
  setTimeout(function () {
    document.getElementById('app').innerText = 'Im ready now';
    window.isPageReady = 1;
  }, 1000);
</script>
</body>
</html>
  `;
});

let server;
function start() {
  return new Promise((resolve) => {
    server = app.listen(3000, () => {
      setTimeout(resolve, 1000);
    });
  });
}

function stop() {
  server.close();
}

module.exports = {
  start,
  stop,
};
