const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) {
      return next(err)
    }
    this.password = hash
    next()
  })
})

UserSchema.methods.comparePasswords = function (plainTextPass) {
  return bcrypt.compare(plainTextPass, this.password)
}

module.exports = mongoose.model('User', UserSchema)
