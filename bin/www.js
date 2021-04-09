const fs = require('fs');
const http = require('http');
const https = require('https');
const env = require(`../env/${ process.env.NODE_ENV }`);
const path = require('path');
const app = require('../app');

const port = process.env.PORT || 443;

http.createServer((req, res) => {
  console.log('redirection https');
  console.log({
    host: req.headers.host,
    url: req.url
  });
  res.writeHead(301, { Localtion: `https://${ req.headers.host }${ req.url }` });
  res.end();
}).listen(80);

const server = https.createServer({
  key: fs.readFileSync(env.key),
  cert: fs.readFileSync(env.cert)
}, app);

server.listen(443, () => {
  console.log(`listening on port 443`);
});

