import { Document } from "mongoose";

// on etent document de mongoose pour que l'interface ITweet est accès au méthode
// liées au documents comme save()
export interface ITweet extends Document {
  content: string;
  author: string;
}
