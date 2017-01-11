let express = require('express')

let app = express()
const port = 1337

app.get('/', (req, res) => {
  res.send('Welcome home.')
})

app.listen(port)

console.log(`Express.js server running on port ${port}.`)
