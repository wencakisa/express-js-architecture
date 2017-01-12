let controllers = require('../controllers')
let auth = require('../config/auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/articles/create', auth.isAuthenticated, controllers.articles.create)

  app.all('/:controller/:method', (req, res) => {
    controllers[req.params.controller][req.params.method](req, res)
  })

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not found.')
  })
}
