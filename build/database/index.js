"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _env_1 = __importDefault(require("../.env"));
const env = _env_1.default[process.env.NODE_ENV];
mongoose_1.default
    .connect(env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
    console.log("connexion db ok!");
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map