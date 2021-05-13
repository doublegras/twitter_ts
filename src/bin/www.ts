import fs from "fs";
import http from "http";
import https from "https";
import conf from "../.env";
const env = conf[process.env.NODE_ENV as "developpement" | "production"];
import app from "../app";
// import { Request, Response } from "express";

http
  .createServer((req, res) => {
    console.log("redirection https");
    res.writeHead(301, {
      Location: `https://${
        req.headers.host!.split(":")[0] + ":" + env.portHttps
      }${req.url}`,
    });
    res.end();
  })
  .listen(env.portHttp);

const httpsServer = https.createServer(
  {
    key: fs.readFileSync(env.key),
    cert: fs.readFileSync(env.cert),
  },
  app
);

httpsServer.listen(env.portHttps, () => {
  console.log(`listening on port ${env.portHttps}`);
});
