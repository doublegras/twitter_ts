"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../database/models/user.model"));
const uuid_1 = require("uuid");
const serviceUser = {
    userCreate: async (user) => {
        try {
            const hashedPassword = await user_model_1.default.hashPassword(user.password);
            const newUser = new user_model_1.default({
                username: user.username,
                local: {
                    email: user.email,
                    password: hashedPassword,
                    //genere universal unique identifier
                    emailToken: uuid_1.v4(),
                },
            });
            return newUser.save();
        }
        catch (err) {
            throw err;
        }
    },
    createGoogleUser: (username, email, id) => {
        const newUser = new user_model_1.default({
            username: username,
            local: {
                email: email,
                googleId: id,
                emailToken: uuid_1.v4(),
            },
        });
        return newUser.save();
    },
    findUserPerEmail: (email) => {
        return user_model_1.default.findOne({ "local.email": email }).exec();
    },
    findUserPerId: (id) => {
        return user_model_1.default.findById(id).exec();
    },
    findUserPerGoogleId: (id) => {
        return user_model_1.default.findOne({ "local.googleId": id }).exec();
    },
    findUserPerUsername: (username) => {
        return user_model_1.default.findOne({ username: username }).exec();
    },
    searchUserPerUsername: (search) => {
        const reg = `^${search}`;
        const regexp = new RegExp(reg);
        return user_model_1.default.find({ username: regexp }).exec();
        //username: { $regex: regexp } aussi possible
    },
    addUserIdToCurrentUserFollowing: (currentUser, IdUserToFollow) => {
        if (currentUser.following) {
            currentUser.following.push(IdUserToFollow);
            return currentUser.save();
        }
        else {
            return null;
        }
    },
    removeUserIdToCurrentUserFollowing: (currentUser, IdUserToUnFollow) => {
        if (currentUser.following) {
            currentUser.following = currentUser.following.filter((userId) => userId.toString() !== IdUserToUnFollow);
            return currentUser.save();
        }
        return null;
    },
};
exports.default = serviceUser;
//# sourceMappingURL=user.service.js.map