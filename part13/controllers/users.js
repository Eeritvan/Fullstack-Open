const router = require('express').Router()
const { User, Blog } = require('../models')
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