let controllers = require('../controllers')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.register)
  app.post('/users/create', controllers.users.create)

  // app.all('/:controller/:method', (req, res) => {
  //   controllers[req.params.controller].req.params.method()
  // })

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not found.')
  })
}
