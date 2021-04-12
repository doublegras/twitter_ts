const mongoose = require("mongoose");
const schema = mongoose.Schema;

const tweetSchema = schema({
  content: {
    type: String,
    maxlength: [140, "ne peut pas contenir plus de 140 caracteres"],
    minlength: [1, "doit contenir au moin 1 caractere"],
    required: [true, "ce champ est requis"],
  },
  author: { type: schema.Types.ObjectId, ref: 'users', required: true }
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
