const router = require('express').Router()
const { User, Blog, ReadingList } = require('../models')
const errorHandler = require('../middleware/errorhandler')
const userFinder = require('../middleware/userfinder')

router.get('/', async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['title', 'url']
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read) {
    where.read = req.query.read
  }

  req.user = await User.findByPk( req.params.id, {
    attributes: ['name', 'username'],
    include: {
      model: Blog,
      as: 'readings',
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId', 'readinglist']
      },
      through: {
        model: ReadingList,
        attributes: ['read', 'id'],
        where
      }
    }
  })
  res.json(req.user)
})

router.post('/', async (req, res) => {
  const newUser = {
    ...req.body,
    password: "password",
  }
  const user = await User.create(newUser)
  res.json(user)
})

router.put('/:username', userFinder, async (req, res) => {
  req.user.username = req.body.username
  await req.user.save()
  res.json({ username: req.user.username })
})

router.use(errorHandler)

module.exports = router