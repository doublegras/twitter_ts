"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("./database/index");
const app = express_1.default();
exports.default = app;
const jwt_config_1 = __importDefault(require("./config/jwt.config"));
app.use(cookie_parser_1.default());
app.disable("x-powered-by");
require("./config/passport.config");
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(jwt_config_1.default.extractUserFromToken);
app.use(jwt_config_1.default.addJwtFeatures);
app.use(morgan_1.default("short"));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(index_route_1.default);
// if (process.env.NODE_ENV === 'dev') {
//   app.use(errorHandler());
// } else {
//   app.use((err, req, res, next) => {
//     const code = err.code || 500;
//     res.status(code).json({
//       code: code,
//       message: code === 500 ? null : err.message
//     })
//   })
// }
app.use((err, res) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
//# sourceMappingURL=app.js.map