const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Book = require("./models/bookModel")
const Author = require("./models/authorModel")
const User = require("./models/userModel")
const jwt = require("jsonwebtoken")
const { v1: uuid } = require('uuid')
const { GraphQLError } = require("graphql/index")
require('dotenv').config();

const error = (errormessage, invalid) => {
  throw new GraphQLError(errormessage, {
    extensions: {
      code: 'BAD_USER_INPUT',
      invalidArgs: invalid,
    }
  })
}

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments({}),
    authorCount: async () => Author.countDocuments({}),
    allBooks: async (root, args) => {
      let result = await Book.find({}).populate('author')
      if (args.author) {
        result = result.filter(b => b.author.name === args.author)
      }
      if (args.genre) {
        result = result.filter(b => b.genres.includes(args.genre))
      }
      return result
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Book: {
    author: async (book) => {
      return Author.findById(book.author)
    },
  },
  Author: {
    bookCount: async ({id}) => await (Book.countDocuments({ author: id }))
  },
   Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        error('Wrong authentication key', args.title)
      }
      const isAuthor = await Author.findOne({ name: args.author })
      let id = 0
      if (!isAuthor) {
        if (args.author.length < 4) {error('Author must be at least 4 characters long', args.author)}
        const newAuthor = new Author({ name: args.author, id: uuid() })
        await newAuthor.save()
        id = newAuthor.id
      } else {
        id = isAuthor.id
      }
      if (args.title.length < 5) {error('Title must be at least 5 characters long', args.title)}
      const newBook = new Book({ ...args, author: id })
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      await newBook.save()
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        error('Wrong authentication key', args.name)
      }
      const updatedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true, runValidators: true }
      )
      return updatedAuthor
    },
    createUser: async (root, args) => {
      if (args.username.length < 3) {error('Username must be at least 5 characters long', args.username)}
      const username = args.username
      const favoriteGenre = args.favoriteGenre
      const password = process.env.USER_PASSWORD

      const newUser = await new User({ username, password, favoriteGenre })
      return newUser.save()

    },
    login: async (root, args) => {
      const userInfo = await User.findOne({ username: args.username })
      if (!userInfo || args.password !== userInfo.password) {
        error('Wrong credentials', args.username)
      }

      const userForToken = {
        username: userInfo.username,
        id: userInfo._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  }
}

module.exports = resolvers