const { deleteBook } = require('../controllers/user-controller');
const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    searchGoogleBooks: async (parent,{bookName}) => {
      return fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`);
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('savedBooks');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
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
    saveBook: async (parent,args, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book.id } },
          { new: true, runValidators: true },
        );

        return book;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    deleteBook: async (parent, args, context) => {
      if (context.user) {
        const book = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: {}}}
        );

        return book
      }

      throw AuthenticationError;
    }
  }
};
module.exports = resolvers;
