const { User } = require('../models')
const { Op } = require('sequelize');

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({
    where: {
      username: {
        [Op.iLike]: req.params.username
      }
    }
  })
  next()
}

module.exports = userFinder