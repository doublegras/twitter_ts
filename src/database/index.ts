import mongoose from "mongoose";
import conf from "../.env";
const env = conf[process.env.NODE_ENV as "developpement" | "production"];

mongoose
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
