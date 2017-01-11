let express = require('express')
let mongoose = require('mongoose')

mongoose.Promise = global.Promise
let app = express()

const connection = 'mongodb://localhost:27017/express-db'
const port = 1337

app.get('/', (req, res) => {
  mongoose
    .connect(connection)
    .then(() => {
      console.log('Mongo DB is ready.')
      res.send('Welcome home.')
    })
})

app.listen(port)

console.log(`Express.js server running on port ${port}.`)
