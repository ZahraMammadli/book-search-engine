// import user model
const { User } = require("../models");
// import token
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: () => {
      return "Hello World";
    },
  },
  Mutation: {
    // Resovler to login user
    login: async (parent, args) => {
      const user = await User.findOne({
        $or: [{ username: args.username }, { email: args.email }],
      });
      if (!user) {
        return { message: "Can't find this user" };
      }
      const correctPw = await user.isCorrectPassword(args.password);

      // check if password is correct
      if (!correctPw) {
        return { message: "Wrong password!" };
      }

      // retrieve the token
      const token = signToken(user);

      return { user, token };
    },

    //  Resolver to add new User
    addUser: async (parent, args) => {
      const user = await User.create(args);

      if (!user) {
        return { message: "Something is wrong!" };
      }

      const token = signToken(user);
      return { user, token };
    },

    saveBook: async (parent, args) => {
      console.log(args);
      return { message: "in progress" };
    },
  },
};

module.exports = resolvers;
