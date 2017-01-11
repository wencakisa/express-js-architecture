let express = require('express')
let path = require('path')

module.exports = (app, config, viewsDir) => {
  app.set('view engine', 'handlebars')
  app.set('views', path.join(config.rootPath, viewsDir))
  app.use('/public', express.static(path.join(config.rootPath, 'public')))

  console.log('Express.js is ready.')
}
