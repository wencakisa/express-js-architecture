module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('home')
  })

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not found.')
    res.end()
  })
}
