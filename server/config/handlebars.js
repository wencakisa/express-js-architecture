let exphbs = require('express-handlebars')
let path = require('path')

module.exports = (app, viewsDir) => {
  let hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(viewsDir, '/layouts')
  })

  app.engine('handlebars', hbs.engine)
}
