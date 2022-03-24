const morgan = require('morgan')

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body)
})

const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params);
}

module.exports = {
  morgan,
  info,
  error
}