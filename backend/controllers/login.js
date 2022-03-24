const User = require('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const passwordCorrect = await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  res.json(user)
})

module.exports = loginRouter