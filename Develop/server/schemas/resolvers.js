const resolvers = {
  Query: {
    me: () => {
      return "Hello World";
    },
  },
  Mutation: {
    login: (parent, args) => {
      console.log(args);
    },
  },
};

module.exports = resolvers;
