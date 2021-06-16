"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var _env_1 = __importDefault(require("../.env"));
var env = _env_1["default"][process.env.NODE_ENV];
var app_1 = __importDefault(require("../app"));
// import { Request, Response } from "express";
http_1["default"]
    .createServer(function (req, res) {
    console.log("redirection https");
    res.writeHead(301, {
        Location: "https://" + (req.headers.host.split(":")[0] + ":" + env.portHttps) + req.url
    });
    res.end();
})
    .listen(env.portHttp);
var httpsServer = https_1["default"].createServer({
    key: fs_1["default"].readFileSync(env.key),
    cert: fs_1["default"].readFileSync(env.cert)
}, app_1["default"]);
httpsServer.listen(env.portHttps, function () {
    console.log("listening on port " + env.portHttps);
});
//# sourceMappingURL=www.js.map