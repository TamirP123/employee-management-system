const { User, Post, Category, Thought } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    logs: async () => {
      return Log.find().populate('userId').sort({ timestamp: -1 });
    },
    userLogs: async (parent, { userId }) => {
      return Log.find({ userId }).populate('userId').sort({ timestamp: -1 });
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
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    clockIn: async (parent, { userId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $set: { clockedIn: true } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    clockOut: async (parent, { userId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $set: { clockedIn: false } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    addLog: async (parent, { userId, action }) => {
      return Log.create({ userId, action });
    },
  },
};

module.exports = resolvers