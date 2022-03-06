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
  type Auth {
    token: ID
    user: User
  }
  input BookData {
    bookId: ID
    authors: [String]
    title: String
    description: String
    image: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookData!): User
  }
`;

module.exports = typeDefs;
