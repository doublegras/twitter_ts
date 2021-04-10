const fs = require('fs');
const http = require('http');
const https = require('https');
const env = require(`../.env/${ process.env.NODE_ENV }`);
const path = require('path');
const app = require('../app');

const port = process.env.PORT || 443;

const httpServer = http.createServer((req, res) => {
  console.log('redirection https');
  res.writeHead(301, { Location: `https://${ req.headers.host.split(':')[0] + ':' + env.portHttps }${ req.url }` });
  res.end();
}).listen(env.portHttp);

const httpsServer = https.createServer({
  key: fs.readFileSync(env.key),
  cert: fs.readFileSync(env.cert)
}, app);

httpsServer.listen(env.portHttps, () => {
  console.log(`listening on port ${ env.portHttps }`);
});

