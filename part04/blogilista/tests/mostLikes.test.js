const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('Checking for author with most total likes', () => {
    const listOfBlogs = [
        {
            _id: '1',
            title: 'Example 1',
            author: 'Writer 1',
            url: 'example.com',
            likes: 10,
            __v: 0
        },
        {
            _id: '2',
            title: 'Example 2',
            author: 'Writer 1',
            url: 'example.com',
            likes: 20,
            __v: 0
        },
        {
            _id: '3',
            title: 'Example 3',
            author: 'Writer 2',
            url: 'example.com',
            likes: 5,
            __v: 0
        },
        {
            _id: '4',
            title: 'Example 4',
            author: 'Writer 2',
            url: 'example.com',
            likes: 10,
            __v: 0
        },
        {
            _id: '5',
            title: 'Example 5',
            author: 'Writer 3',
            url: 'example.com',
            likes: 15,
            __v: 0
        }
    ]

    test('Returning author with most likes', () => {
        const result = listHelper.mostLikes(listOfBlogs)
        const expected = {
            author: "Writer 1",
            likes: 30
        }
        assert.deepEqual(result, expected)
    })
})