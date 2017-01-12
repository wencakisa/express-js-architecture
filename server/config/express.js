let express = require('express')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let session = require('express-session')
let passport = require('passport')
let path = require('path')

module.exports = (app, config, viewsDir) => {
  app.set('view engine', 'handlebars')
  app.set('views', path.join(config.rootPath, viewsDir))

  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
    secret: 'neshto-taino!#?@$%',
    resave: true,
    saveUninitialized: true
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }

    next()
  })
  app.use('/public', express.static(path.join(config.rootPath, 'public')))

  console.log('Express.js is ready.')
}
