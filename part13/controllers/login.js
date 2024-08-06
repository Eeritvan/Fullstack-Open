const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { User, Session } = require('../models')
const { SECRET } = require('../util/config')

const errorHandler = require('../middleware/errorhandler')

router.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'password'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Session.destroy({ where: { user_id: user.id}})
  await Session.create({ user_id: user.id, token })

  return res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

router.use(errorHandler)

module.exports = router