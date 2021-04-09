const mongoose = require("mongoose");
const env = require(`../.env/${ process.env.NODE_ENV }`);

mongoose
  .connect( env.dbUrl,{
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
