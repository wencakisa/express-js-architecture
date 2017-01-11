let mongoose = require('mongoose')
let encryption = require('../utilities/encryption')

let requiredValidationMessage = '{PATH} is required.'

let userSchema = mongoose.Schema({
  username: {
    type: String, required: requiredValidationMessage, unique: true
  },
  firstName: {
    type: String, required: requiredValidationMessage
  },
  lastName: {
    type: String, required: requiredValidationMessage
  },
  salt: String,
  hashedPass: String,
  roles: [String]
})

let User = mongoose.model('User', userSchema)

module.exports.seedAdminUser = () => {
  let salt = encryption.generateSalt()
  let hashedPass = encryption.generateHashedPassword(salt, '123456')

  User.create({
    username: 'Admin',
    firstName: 'Admin',
    lastName: 'Adminov',
    salt: salt,
    hashedPass: hashedPass,
    roles: ['Admin']
  })
}
