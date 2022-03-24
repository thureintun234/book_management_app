const express = require('express')
const app = express()
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const middleware = require('./utils/middleware')
const bookRouter = require('./controllers/books')
const categoryRouter = require('./controllers/categories')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// middlewares
app.use(cors())
app.use(express.json())
app.use(helmet())
// logger
app.use(logger.morgan(':method :url :status :res[content-length] - :response-time ms :data'))

// mongodb connection
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('MongoDB connected successfully'))
  .catch(err => logger.error('MongoDB connection error', err.message))

// routes
app.use('/api/books', bookRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

// middlewares error handlers
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app