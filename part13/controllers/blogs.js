const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')

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
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.send(blog);
  } catch (e) {
    res.status(400).send({ error: 'missing or invalid fields' });
  }
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const id = req.blog.id
  const userId = req.blog.userId

  if (userId === user.id) {
    await Blog.destroy({ where: { id } })
    res.status(204).end()
  } else {
    res.status(401).json({ error: 'no permission' })
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes += 1
  await req.blog.save()
  res.json({ likes: req.blog.likes })
})

router.use(errorHandler)

module.exports = router