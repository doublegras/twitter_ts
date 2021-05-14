import User from "../database/models/user.model";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../interfaces";
import { IUserForm } from "../interfaces";

const serviceUser = {
  userCreate: async (user: IUserForm) => {
    try {
      const hashedPassword = await User.hashPassword(user.password);
      const newUser = new User({
        username: user.username,
        local: {
          email: user.email,
          password: hashedPassword,
          //genere universal unique identifier
          emailToken: uuidv4(),
        },
      });
      return newUser.save();
    } catch (err) {
      throw err;
    }
  },

  createGoogleUser: (username: string, email: string, id: string) => {
    const newUser = new User({
      username: username,
      local: {
        email: email,
        googleId: id,
        emailToken: uuidv4(),
      },
    });
    return newUser.save();
  },

  findUserPerEmail: (email: string) => {
    return User.findOne({ "local.email": email }).exec();
  },

  findUserPerId: (id: string): Promise<IUser | null> => {
    return User.findById(id).exec();
  },

  findUserPerGoogleId: (id: string) => {
    return User.findOne({ "local.googleId": id }).exec();
  },

  findUserPerUsername: (username: string) => {
    return User.findOne({ username: username }).exec();
  },

  searchUserPerUsername: (search: string) => {
    const reg = `^${search}`;
    const regexp = new RegExp(reg);
    return User.find({ username: regexp }).exec();
    //username: { $regex: regexp } aussi possible
  },

  addUserIdToCurrentUserFollowing: (
    currentUser: IUser,
    IdUserToFollow: string
  ) => {
    if (currentUser.following) {
      currentUser.following.push(IdUserToFollow);
      return currentUser.save();
    } else {
      return null;
    }
  },

  removeUserIdToCurrentUserFollowing: (
    currentUser: IUser,
    IdUserToUnFollow: string
  ) => {
    if (currentUser.following) {
      currentUser.following = currentUser.following.filter(
        (userId) => userId.toString() !== IdUserToUnFollow
      );
      return currentUser.save();
    }
    return null;
  },
};

export default serviceUser;
