const router = require('express').Router()

const { Session } = require('../models')

const errorHandler = require('../middleware/errorhandler')
const tokenExtractor = require('../middleware/tokenExtractor')

router.post('/', tokenExtractor, async (req, res,) => {
  await Session.destroy({ where: { user_id: req.decodedToken.id } })
  res.status(204).end()
})

router.use(errorHandler)

module.exports = router