const router = require('express').Router()

const { User, ReadingList } = require('../models')

const errorHandler = require('../middleware/errorhandler')
const tokenExtractor = require('../middleware/tokenExtractor')

router.post('/', async (req, res) => {
  const readingList = await ReadingList.create({ ...req.body })
  res.json(readingList)
})

router.put('/:id', tokenExtractor, async (req, res) => {
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

  const listData = await ReadingList.findByPk(req.params.id)

  if (user.id === listData.user_id) {
    listData.read = req.body.read
    await listData.save()
    res.status(204).end()
  }
  res.status(405).end()
})

router.use(errorHandler)

module.exports = router