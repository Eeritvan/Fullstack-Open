const router = require('express').Router()

const sequelize = require('sequelize')

const { Blog } = require('../models')

const errorHandler = require('../middleware/errorhandler')

router.get('/', async (_req, res) => {
  const blogs = await Blog.findAll({
    order: [['likes', 'DESC']],
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: 'author'
  })
  res.json(blogs)
})

router.use(errorHandler)

module.exports = router