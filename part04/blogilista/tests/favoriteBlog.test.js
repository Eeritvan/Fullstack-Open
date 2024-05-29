const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () =>  {
    const listOfBlogs = [
        {
            _id: '1',
            title: 'example 1',
            author: 'Writer 1',
            url: 'example.com',
            likes: 5,
            __v: 0
        },
        {
            _id: '2',
            title: 'example 2',
            author: 'Writer 2',
            url: 'example.com',
            likes: 0,
            __v: 0
        },
        {
            _id: '3',
            title: 'example 3',
            author: 'Writer 3',
            url: 'example.com',
            likes: 4,
            __v: 0
        }
    ]

    test('list has to filter most liked blog', () => {
        const result = listHelper.favoriteBlog(listOfBlogs)
        assert.strictEqual(result, listOfBlogs[0])
    })
})

