"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const tweetSchema = new Schema({
    content: {
        type: String,
        maxlength: [140, "ne peut pas contenir plus de 140 caracteres"],
        minlength: [1, "doit contenir au moin 1 caractere"],
        required: [true, "ce champ est requis"],
    },
    author: { type: Schema.Types.ObjectId, ref: "users", required: true },
});
const Tweet = mongoose_1.default.model("tweets", tweetSchema);
exports.default = Tweet;
//# sourceMappingURL=tweets.model.js.map