const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const Book = require('./models/bookModel')
const Author = require('./models/authorModel')
const User = require('./models/userModel')
mongoose.set('strictQuery', false)
require('dotenv').config()

const jwt = require('jsonwebtoken')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    me: User
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
}
`

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
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const PORT = process.env.PORT
startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req, res }) => {
    try {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await User
          .findById(decodedToken.id)
        return { currentUser }
      }
    } catch (error) {
      const currentUser = null
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})