const blogAppRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogAppRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    return response.json(blogs)
})

blogAppRouter.post('/', userExtractor, async (request, response) => {
    const user = await request.user
    if (!user) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const blog = await new Blog({ ...request.body, user: user.id })
    const added = await blog.save()

    user.blogs = await user.blogs.concat(blog.id)
    await user.save()

    return response.status(201).json(added)
})

blogAppRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const blogUserId = blog.user.toString()

    if (request.user.id === blogUserId) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(400).end()
    }
})

blogAppRouter.put('/:id', async (request, response) => {
    const body = await request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true, runValidators: true, context: 'query' })
    response.json(updatedBlog)
})

module.exports = blogAppRouter