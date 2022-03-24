const jwt = require('jsonwebtoken')
const logger = require('./logger')
const config = require('./config')

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = token.length < 500

    let decodedData

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, config.SECRET)

      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)

      req.userId = decodedData?.sub
    }
    next()
  } catch (error) {
    logger.error(error)
  }
}

module.exports = auth