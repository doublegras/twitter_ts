"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var _env_1 = __importDefault(require("../.env"));
var env = _env_1["default"][process.env.NODE_ENV];
mongoose_1["default"]
    .connect(env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(function () {
    console.log("connexion db ok!");
})["catch"](function (err) { return console.log(err); });
//# sourceMappingURL=index.js.map