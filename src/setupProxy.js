// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://34.64.233.129:8080', // 백엔드 IP:PORT
      changeOrigin: true,
      pathRewrite: { '^/api': '' }        // ★ '/api' 잘라내기
    })
  );
};
