let express = require('express')
let mongoose = require('mongoose')
let exphbs = require('express-handlebars')
let path = require('path')

let app = express()

let viewsDir = './server/views'

let hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(viewsDir, '/layouts')
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', viewsDir)
app.use('/public', express.static('public'))

let env = process.env.NODE_ENV || 'development'
let config = require('./server/config/config')[env]

mongoose.Promise = global.Promise

app.get('/', (req, res) => {
  mongoose
    .connect(config.db)
    .then(() => {
      console.log('Mongo DB is ready.')
      res.render('home')
    })
})

app.listen(config.port)

console.log(`Express.js server running on port ${config.port}.`)
