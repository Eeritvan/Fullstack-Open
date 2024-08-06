const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User, Session } = require('../models')

const errorHandler = require('../middleware/errorhandler')
const blogFinder = require('../middleware/blogfinder')
const tokenExtractor = require('../middleware/tokenExtractor')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { author: { [Op.iLike]: `%${req.query.search}%` } }
      ]
    }
  }

  const blogs = await Blog.findAll({
    order: [['likes', 'DESC']],
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })
  res.json(blogs)
})
  
router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    if (user.disabled) {
      return res.status(401).json({
        error: 'account disabled'
      })
    }

    const providedToken = req.get('authorization').split(' ')[1]
    const savedToken = await Session.findOne({ where: { token: providedToken }})

    if (!savedToken) {
      return res.status(400).json({ error: 'Please log in to refresh token' })
    }

    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.send(blog)
  } catch (e) {
    return res.status(400).send({ error: 'missing or invalid fields' })
  }
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  
  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled'
    })
  }

  const providedToken = req.get('authorization').split(' ')[1]
  const savedToken = await Session.findOne({ where: { token: providedToken }})

  if (!savedToken) {
    return res.status(400).json({ error: 'Please log in to refresh token' })
  }

  const id = req.blog.id
  const userId = req.blog.userId

  if (userId === user.id) {
    await Blog.destroy({ where: { id } })
    res.status(204).end()
  } else {
    res.status(401).json({ error: 'no permission' })
  }
})

router.put('/:id', tokenExtractor, blogFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)

  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled'
    })
  }

  const providedToken = req.get('authorization').split(' ')[1]
  const savedToken = await Session.findOne({ where: { token: providedToken }})

  if (!savedToken) {
    return res.status(400).json({ error: 'Please log in to refresh token' })
  }

  req.blog.likes += 1
  await req.blog.save()
  res.json({ likes: req.blog.likes })
})

router.use(errorHandler)

module.exports = router