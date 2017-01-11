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

userSchema.method({
  authenticate: (password) => {
    return (encryption.generateHashedPassword(this.salt, password) === this.hashedPass)
  }
})

let User = mongoose.model('User', userSchema)

module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length === 0) {
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
  })
}
