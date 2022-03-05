const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
  }
  type Mutation {
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
