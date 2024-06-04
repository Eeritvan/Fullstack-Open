const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('Checking for author with most blogs.js', () => {
    const listOfBlogs = [
        {
            _id: '1',
            title: 'Example 1',
            author: 'Writer 3',
            url: 'example.com',
            likes: 0,
            __v: 0
        },
        {
            _id: '2',
            title: 'Example 2',
            author: 'Writer 2',
            url: 'example.com',
            likes: 0,
            __v: 0
        },
        {
            _id: '3',
            title: 'Example 3',
            author: 'Writer 3',
            url: 'example.com',
            likes: 0,
            __v: 0
        },
        {
            _id: '4',
            title: 'Example 4',
            author: 'Writer 3',
            url: 'example.com',
            likes: 0,
            __v: 0
        },
        {
            _id: '5',
            title: 'Example 5',
            author: 'Writer 1',
            url: 'example.com',
            likes: 0,
            __v: 0
        }
    ]

    test('Returning author with most blogs.js', () => {
        const result = listHelper.mostBlogs(listOfBlogs)
        const expected = {
            author: "Writer 3",
            blogs: 3
        }
        assert.deepEqual(result, expected)
    })
})