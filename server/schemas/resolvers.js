const { User, Project } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        // logged-in user information
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                  .select("-__v -password")
                  .populate("projects")
                  .populate("savedProjects");

                  return userData;
            }
            throw new AuthenticationError('Not logged in.');
        },
        // all users' information
        users: async () => {
            return User.find()
              .select("-__v -password")
              .populate("projects")
              .populate("savedProjects");
        },
        // one user's information
        user: async (parent, { username }) => {
            return User.findOne({ username })
              .select("-__v -password")
              .populate("projects")
              .populate("savedProjects");
        },
        // all projects
        projects: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Project.find(params).sort({ createdAt: -1 });
        },
        // one project
        project: async (parent, { _id }) => {
            return Project.findOne({ _id });
        }
    },
};