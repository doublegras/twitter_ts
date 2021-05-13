import { Document } from "mongoose";

export interface IUserLocal {
  email: string;
  emailVerified: boolean;
  emailToken: string;
  password: string;
  passwordToken?: string | null;
  passwordTokenExpiration?: Date | null;
  googleId?: string;
}

export interface IUser extends Document {
  username: string;
  local: IUserLocal;
  avatar: string;
  following?: Array<string>;
  comparePassword: (
    password: string,
    hashedPassword: string
  ) => Promise<boolean>;
}

export interface IUserForm {
  username: string;
  email: string;
  password: string;
}
