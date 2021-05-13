"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const _env_1 = __importDefault(require("../.env"));
const env = _env_1.default[process.env.NODE_ENV];
const app_1 = __importDefault(require("../app"));
// import { Request, Response } from "express";
http_1.default
    .createServer((req, res) => {
    console.log("redirection https");
    res.writeHead(301, {
        Location: `https://${req.headers.host.split(":")[0] + ":" + env.portHttps}${req.url}`,
    });
    res.end();
})
    .listen(env.portHttp);
const httpsServer = https_1.default.createServer({
    key: fs_1.default.readFileSync(env.key),
    cert: fs_1.default.readFileSync(env.cert),
}, app_1.default);
httpsServer.listen(env.portHttps, () => {
    console.log(`listening on port ${env.portHttps}`);
});
//# sourceMappingURL=www.js.map