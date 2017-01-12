let controllers = require('../controllers')
let auth = require('../config/auth')

module.exports = (app, express) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  let articlesRouter = express.Router()
  articlesRouter.use(auth.isAuthenticated)

  articlesRouter
    .get('/list', controllers.articles.list)
    .get('/list', controllers.articles.list)
    .all('/add', controllers.articles.add)
    .get('/details/:id', controllers.articles.detail)
    .all('/edit/:id', controllers.articles.edit)
    .get('/delete/:id', controllers.articles.delete)

  app.use('/articles', articlesRouter)

  app.all('/:controller/:method', (req, res) => {
    controllers[req.params.controller][req.params.method](req, res)
  })

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not found.')
  })
}
