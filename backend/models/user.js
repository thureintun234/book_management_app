const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)