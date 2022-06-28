const { gql } = require("apollo-server-express");

const typeDefs = gql `
  type User {
    _id: ID
    username: String
    email: String
    projects: [Project]
    savedProjects: [Project]
  },
  type Project {
    _id: ID
    projectText: String
    createdAt: String
    username: String
    comments: [Comment]
  },
  type Comment {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }
  type Auth {
    token: ID!
    user: User
  }
`;