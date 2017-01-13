let encryption = require('../utilities/encryption')
let User = require('mongoose').model('User')

module.exports = {
  register: (req, res) => {
    if (req.method === 'GET') {
      res.render('users/register')
    } else if (req.method === 'POST') {
      let user = req.body

      if (user.password !== user.confirmPassword) {
        user.globalError = 'Passwords do not match.'
        res.render('users/register', user)
      } else {
        user.salt = encryption.generateSalt()
        user.hashedPass = encryption.generateHashedPassword(user.salt, user.password)

        User
          .create(user)
          .then(user => {
            req
              .logIn(user, (err, user) => {
                if (err) {
                  console.log(err)
                  res.render('users/register', {
                    globalError: err.errors.description.message
                  })
                  return
                }

                res.redirect('/')
              })
          })
          .catch(err => {
            console.log(err)
            res.render('users/register', {
              globalError: err.errors.description.message
            })
            return
          })
      }
    }
  },
  login: (req, res) => {
    if (req.method === 'GET') {
      res.render('users/login')
    } else if (req.method === 'POST') {
      let inputUser = req.body

      User
        .findOne({ username: inputUser.username })
        .then(user => {
          if (!user) {
            res.render('users/login', {
              globalError: 'User does not exist.'
            })
            return
          } else if (!user.authenticate(inputUser.password)) {
            user.globalError = 'Invalid username or password.'
            res.render('users/login', user)
            return
          } else {
            req
              .logIn(user, (err, user) => {
                if (err) {
                  console.log(err)
                  res.render('users/login', {
                    globalError: err.errors.description.message
                  })
                  return
                }

                res.redirect('/')
              })
          }
        })
        .catch(err => {
          console.log(err)
          res.render('users/login', {
            globalError: err.errors.description.message
          })
          return
        })
    }
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
