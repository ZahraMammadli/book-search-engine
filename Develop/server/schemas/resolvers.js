// import user model
const { User } = require("../models");
// import token
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      return { message: "Can't find this user" };
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

    saveBook: async (parent, args, context) => {
      console.log(context.user);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: { ...args.book } } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        return { message: "failed to save the book" };
      }
    },
  },
};

module.exports = resolvers;
