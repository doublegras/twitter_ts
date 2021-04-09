const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://marc:Dfrvnzazoo22_Mb@cluster0.rhhgb.mongodb.net/twitter?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log("connexion db ok!");
  })
  .catch((err) => console.log(err));
