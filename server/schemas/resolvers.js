const { User, Project } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("projects")
          .populate("savedProjects");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    // get all projects or get all projects for one user by username
    projects: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Project.find(params).sort({ createdAt: -1 });
    },
    // get a single project by id
    project: async (parent, { _id }) => {
      return Project.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("projects")
        .populate("savedProjects");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("projects")
        .populate("savedProjects");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addProject: async (parent, args, context) => {
      if (context.user) {
        const project = await Project.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { projects: project._id } },
          { new: true }
        );

        return project;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { projectId, commentBody }, context) => {
      if (context.user) {
        const updatedProject = await Project.findOneAndUpdate(
          { _id: projectId },
          {
            $push: {
              comments: { commentBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedProject;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addSavedProject: async (parent, { savedProjectId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedProjects: savedProjectId } },
          { new: true }
        ).populate("savedProjects");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeSavedProject: async (parent, { savedProjectId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedProjects: savedProjectId } },
          { new: true }
        ).populate("savedProjects");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
