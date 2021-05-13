import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  content: {
    type: String,
    maxlength: [140, "ne peut pas contenir plus de 140 caracteres"],
    minlength: [1, "doit contenir au moin 1 caractere"],
    required: [true, "ce champ est requis"],
  },
  author: { type: Schema.Types.ObjectId, ref: "users", required: true },
});

const Tweet = mongoose.model("tweets", tweetSchema);

export default Tweet;
