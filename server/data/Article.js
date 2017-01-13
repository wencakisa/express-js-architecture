let mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required.'
let minLengthValidationMessage = 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'
let maxLengthValidationMessage = 'The value of path `{PATH}` (`{VALUE}`) is longer than the maximum allowed length ({MAXLENGTH}).'

let titleMinLength = [5, minLengthValidationMessage]
let titleMaxLength = [30, maxLengthValidationMessage]
let descriptionMaxLength = [500, maxLengthValidationMessage]

let articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: requiredValidationMessage,
    unique: true,
    minlength: titleMinLength,
    maxlength: titleMaxLength
  },
  description: {
    type: String,
    required: requiredValidationMessage,
    minlength: titleMinLength,
    maxlength: descriptionMaxLength
  },
  authorUsername: String
})

module.exports = mongoose.model('Article', articleSchema)
