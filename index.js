let express = require('express')

let app = express()

let viewsDir = 'server/views'
let env = process.env.NODE_ENV || 'development'
let config = require('./server/config/config')[env]

require('./server/config/express')(app, config, viewsDir)
require('./server/config/handlebars')(app, viewsDir)
require('./server/config/database')(config)
require('./server/config/routes')(app)
require('./server/config/passport')()

app.listen(config.port)

console.log(`Server running on port ${config.port}.`)
