module.exports = (res, view) => {
  res.render(view, { globalError: 'Woops! 500.' })
  return
}
