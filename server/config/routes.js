let controllers = require('../controllers')
let auth = require('../config/auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/articles/list', auth.isAuthenticated, controllers.articles.list)
  app.all('/articles/add', auth.isAuthenticated, controllers.articles.add)
  app.get('/articles/details/:id', auth.isAuthenticated, controllers.articles.detail)
  app.all('/articles/edit/:id', auth.isAuthenticated, controllers.articles.edit)
  app.get('/articles/delete/:id', auth.isAuthenticated, controllers.articles.delete)

  app.all('/:controller/:method', (req, res) => {
    controllers[req.params.controller][req.params.method](req, res)
  })

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not found.')
  })
}
