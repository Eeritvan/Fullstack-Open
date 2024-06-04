const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')

const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    const newUser = {
        username: 'User1',
        name: 'Test User',
        password: 'Password1',
        blogs: []
    }

    await api
        .post('/api/users')
        .send(newUser)

    const { body } = await api
        .post('/api/login')
        .send({
            username: 'User1',
            password: 'Password1'
        })

    const userInfo = await jwt.verify(body.token, process.env.SECRET)
    const user = await User.findById(userInfo.id)

    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs(userInfo.id))
    const blogs = await api.get('/api/blogs')
    for (const i in blogs.body) {
        user.blogs = await user.blogs.concat(blogs.body[i].id)
        await user.save()
    }
})

describe('blog creation and retrieval', () => {
    test('adding blog to database and checking if length grows', async () => {
        const newBlog = new Blog({
            title: "AddingTest",
            author: "Adding Test",
            url: "adding.test",
            likes: 35
        })
        const added = await newBlog.save()
        assert.strictEqual(newBlog, added)
        const newLength = await api.get('/api/blogs').then(response => response.body.length)
        const initialLength = helper.initialBlogs().length
        assert.strictEqual(newLength, initialLength + 1)
    })

    test('correct amount of blogs.js are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8')
        const initialLength = helper.initialBlogs().length
        assert.strictEqual(response.body.length, initialLength)
    })
})

describe('editing blogs.js', () => {
    test('editing a blog and checking if content was edited', async () => {
        const id = await api.get('/api/blogs').then(response => response.body[0].id)
        const updatedBlog = await ({
            title: "updatedTest1",
            author: "Updated Tester One",
            url: "updated.test1.example.com",
            likes: 1100
        })

        const response = await api
            .put(`/api/blogs/${id}`)
            .send(updatedBlog)
            .expect(200)
            .then(response => {
                const { id, user, ...rest } = response.body
                return rest
            })
        assert.deepEqual(response, updatedBlog)
    })

    test('checking if a blog with wrong id returns 400', async() => {
        const id = 0
        const updatedBlog = await ({ title: "WrongId" })
        await api
            .put(`/api/blogs/${id}`)
            .send(updatedBlog)
            .expect(400)
    })
})

describe('deletion of blogs.js', () => {
    test('deleting one blog and checking new length', async() => {
        const id = await api.get('/api/blogs').then(response => response.body[0].id)

        const { body } = await api
            .post('/api/login')
            .send({
                username: 'User1',
                password: 'Password1'
            })

        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${body.token}`)
            .expect(204)

        const length = await api.get('/api/blogs').then(response => response.body.length)
        const initialLength = helper.initialBlogs().length
        assert.strictEqual(length, initialLength - 1)
    })

    test('checking if deletion of a blog with wrong id returns 400', async() => {
        const id = 0
        await api
            .delete(`/api/blogs/${id}`)
            .expect(400)
    })
})

describe('blog properties and validation', () => {
    test('identifier is id', async () => {
        const response = await api.get('/api/blogs')
        const initialLength = helper.initialBlogs().length
        assert.strictEqual(response.body.filter(x => x.id).length, initialLength)
    })

    test('if likes is not assigned it is set to 0', async () => {
        const newBlog = new Blog({
            title: "NoLikes",
            author: "No Likes",
            url: "nolikes"
        })
        const added = await newBlog.save()
        assert.strictEqual(added.likes, 0)
    })

    test('checking if missing title or url returns 400', async() => {
        const missingTitle = new Blog({
            author: "Missing Title",
            url: "missingtitle",
        })
        const missingUrl = new Blog({
            title: "MissingUrl",
            author: "Missing Url",
        })

        await api
            .post('/api/blogs')
            .send(missingTitle)
            .expect(400)
        await api
            .post('/api/blogs')
            .send(missingUrl)
            .expect(400)
    })
})

describe('Testing for invalid users password and name', () => {
    test('Testing if invalid password returns 400', async () => {
        const newUser = ({
            username: "testing...",
            name: "testing...",
            password: "a" // too short
        })

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('Testing if invalid name returns 400', async () => {
        const newUser = ({
            username: "",
            name: "testing...",
            password: "testing..."
        })

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})