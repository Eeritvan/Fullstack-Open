const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1, })
    return response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (password.length < 3) {
        response.status(400).json({ error: 'password is too short' })
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const newUser = await new User({ username, name, passwordHash })
        const savedUser = await newUser.save()
        response.status(201).json(savedUser)
    }
})

module.exports = usersRouter