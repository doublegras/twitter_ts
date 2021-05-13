import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";
import { IUser } from "../../interfaces";

const userSchema = new Schema({
  username: { type: String, unique: true },
  local: {
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    emailToken: { type: String, required: true },
    password: String,
    passwordToken: String,
    passwordTokenExpiration: Date,
    googleId: String,
  },
  avatar: { type: String, default: "/images/avatar/no-user.jpeg" },
  following: { type: [Schema.Types.ObjectId], ref: "users" },
});

userSchema.statics.hashPassword = async (passowrd) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(passowrd, salt);
  } catch (err) {
    throw err;
  }
};

userSchema.methods.comparePassword = (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};

interface IUserModel extends Model<IUser> {
  hashPassword: (password: string) => string;
}

// const User = mongoose.model("users", userSchema);
const User = mongoose.model<IUser, IUserModel>("users", userSchema);

export default User;

// import mongoose, { Model } from "mongoose";
// const Schema = mongoose.Schema;
// import bcrypt from "bcrypt";
// import { IUser } from "../../interfaces";

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   local: {
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   avatar: { type: String, default: "/images/default-profile.svg" },
//   following: { type: [Schema.Types.ObjectId], ref: "user" },
// });

// userSchema.statics.hashPassword = (password: string) => {
//   return bcrypt.hash(password, 12);
// };

// userSchema.methods.comparePassword = (
//   password: string,
//   hashedPassword: string
// ) => {
//   return bcrypt.compare(password, hashedPassword);
// };

// interface IUserModel extends Model<IUser> {
//   hashPassword: (password: string) => string;
// }

// export const User = mongoose.model<IUser, IUserModel>("user", userSchema);
