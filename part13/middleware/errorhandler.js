const errorHandler = (error, request, response, next) => {
  console.error(error.name)

  switch (error.name) {
    case 'TypeError': {
      return response.status(400).send({ error: 'malformatted id' })
    }
    case 'SequelizeValidationError': {
      return response.status(400).send({ error: 'Validation isEmail on username failed' })
    }
  }
    


  next(error)
}

module.exports = errorHandler