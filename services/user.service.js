const { searchUserPerUsername } = require('../controllers/user.controller');
const User = require('../database/models/user.model');

const serviceUser = {

  userCreate: async (user) => {
    try {
      hashedPassword = await User.hashPassword(user.password);
      const newUser = new User({
        username: user.username,
        local: {
          email: user.email,
          password: hashedPassword
        }
      })
      return newUser.save();
    } catch (err) {
      throw(err);
    }
  },

  createGoogleUser: (username, email, id) => {
    const newUser = new User({
      username: username,
      local: {
        email: email,
        googleId: id
      }
    })
    return newUser.save();
  },

  findUserPerEmail: (email) => {
    return User.findOne({'local.email' : email}).exec();
  },

  findUserPerId: (id) => {
    return User.findById(id).exec();
  },

  findUserPerGoogleId: (id) => {
    return User.findOne({ 'local.googleId' : id }).exec();
  },

  findUserPerUsername: (username) => {
    return User.findOne({ username: username }).exec();
  },

  searchUserPerUsername: (search) => {
    const reg = `^${ search }`;
    const regexp = new RegExp(reg);
    return User.find({ username: regexp }).exec();
    //username: { $regex: regexp } aussi possible
  },

  addUserIdToCurrentUserFollowing: (currentUser, IdUserToFollow) => {
    currentUser.following.push(IdUserToFollow);
    return currentUser.save();
  },

  removeUserIdToCurrentUserFollowing: (currentUser, IdUserToUnFollow) => {
    currentUser.following = currentUser.following.filter( 
      userId => userId.toString() !== IdUserToUnFollow
    );
    return currentUser.save();
  }
}

module.exports = serviceUser;