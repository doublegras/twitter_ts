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

}

module.exports = serviceUser;