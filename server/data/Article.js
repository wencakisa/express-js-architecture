let mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required.'

let articleSchema = mongoose.Schema({
  title: {
    type: String, required: requiredValidationMessage, unique: true
  },
  description: {
    type: String, required: requiredValidationMessage
  },
  authorUsername: String
})

module.exports = mongoose.model('Article', articleSchema)
