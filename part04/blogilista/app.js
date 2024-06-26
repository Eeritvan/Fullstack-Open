const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { errorHandler, tokenExtractor } = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const resetRouter = require('./controllers/reset')
const mongoose = require('mongoose')

app.use(tokenExtractor)

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('connected to MongoDB'))
    .catch(error => logger.error(`error connection to MongoDB: ${error.message}`))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/testing', resetRouter)

app.use(errorHandler)

module.exports = app