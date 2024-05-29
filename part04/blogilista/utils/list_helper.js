const _ = require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = blogs => {
    return blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog, 0)
}

const mostBlogs = blogs => {
    const authors = _.countBy(blogs, 'author');
    const mostBlogs = _.maxBy(_.toPairs(authors), 1);
    return {
        author: mostBlogs[0],
        blogs: mostBlogs[1]
    }
}

const mostLikes = blogs => {
    const authors = _.groupBy(blogs, 'author')
    const authorsLikes = _.mapValues(authors, authorBlogs => _.sumBy(authorBlogs, 'likes'))
    const mostLikes = _.maxBy(_.toPairs(authorsLikes), 1);

    return {
        author: mostLikes[0],
        likes: mostLikes[1]
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }