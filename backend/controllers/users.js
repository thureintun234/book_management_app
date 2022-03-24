const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res) => {
  const body = req.body

  const saltsRound = 10
  const hashPassword = await bcrypt.hash(body.password, saltsRound)

  const user = new User({
    username: body.username,
    email: body.email,
    password: hashPassword,
    isAdmin: body.isAdmin
  })
  const savedUser = await user.save()
  res.json(savedUser)
})

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

module.exports = userRouter