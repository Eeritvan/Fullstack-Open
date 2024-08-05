const jwt = require('jsonwebtoken')
const router = require('express').Router()

const errorHandler = require('../middleware/errorhandler')

const { User } = require('../models')
const { SECRET } = require('../util/config')

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

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  console.log(token)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

router.use(errorHandler)

module.exports = router