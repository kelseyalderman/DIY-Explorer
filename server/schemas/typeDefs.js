// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    projects: [Project]
    savedProjects: [Project]
  }

  type Project {
    _id: ID
    projectTitle: String
    projectText: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    projects(username: String): [Project]
    project(_id: ID!): Project
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addProject(projectTitle: String!, projectText: String!): Project
    addComment(projectId: ID!, commentBody: String!): Project
    addSavedProject(savedProjectId: ID!): Project
    removeSavedProject(savedProjectId: ID!): Project
    removeProject(projectId: ID!): Project
  }

  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;
