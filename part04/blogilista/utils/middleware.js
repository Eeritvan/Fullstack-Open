const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    switch (error.name) {
        case 'CastError':
            return response.status(400).send({ error: 'malformatted id' })
        case 'ValidationError':
            return response.status(400).json({ error: error.message })
        case 'MongoServerError':
            return response.status(400).json({ error: error.message })
        case 'TokenExpiredError':
            return response.status(401).json({ error: 'token expired' })
        case 'JsonWebTokenError':
            return response.status(400).json({ error: 'incorrect token' })
        default:
            next(error)
    }
}

const tokenExtractor = async (request, response, next) => {
    const authorization = await request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = await authorization.replace('Bearer ', '')
    } else {
        request.token = null
    }
    await next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = await jwt.verify(request.token, process.env.SECRET)
    if (decodedToken) {
        request.user = await User.findById(decodedToken.id)
    } else {
        request.user = null
    }
    await next()
}


module.exports = { errorHandler, tokenExtractor, userExtractor }