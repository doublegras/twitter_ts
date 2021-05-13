import express, { Application, Response } from "express";
import morgan from "morgan";
import path from "path";
import routing from "./routes/index.route";
import cookieParser from "cookie-parser";
import "./database/index";
const app: Application = express();

export default app;

import jwtAuth from "./config/jwt.config";
app.use(cookieParser());
app.disable("x-powered-by");

import "./config/passport.config";

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(jwtAuth.extractUserFromToken);
app.use(jwtAuth.addJwtFeatures);

app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routing);

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

app.use((err: any, res: Response) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
