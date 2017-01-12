let Article = require('../data/Article')
let errorHandler = require('../utilities/errorHandler')

function canEditArticle (req, article) {
  return (req.user.username === article.authorUsername)
}

module.exports = {
  list: (req, res) => {
    Article
      .find({})
      .then(articles => {
        res.render('articles/list', { articles: articles })
      })
  },
  add: (req, res) => {
    if (req.method === 'GET') {
      res.render('articles/add')
    } else if (req.method === 'POST') {
      let article = req.body
      article.authorUsername = req.user.username

      Article
        .create(article)
        .then(article => {
          res.redirect('/articles/list')
        })
        .catch(err => {
          console.log(err)
          errorHandler(res, 'articles/add')
        })
    }
  },
  detail: (req, res) => {
    let id = req.params.id

    Article
      .findById(id)
      .then(article => {
        article.canEdit = canEditArticle(req, article)
        res.render('articles/detail', article)
      })
      .catch(err => {
        console.log(err)
        errorHandler(res, 'articles/list')
      })
  },
  edit: (req, res) => {
    let id = req.params.id
    let method = req.method

    Article
      .findById(id)
      .then(article => {
        if (!canEditArticle(req, article)) {
          article.globalError = 'You can edit only your own articles.'
          res.render('articles/detail', article)
          return
        }

        if (method === 'GET') {
          res.render('articles/edit', article)
        } else if (method === 'POST') {
          article
            .update(req.body)
            .then(article => {
              res.redirect(`/articles/details/${id}`)
            })
            .catch(err => {
              console.log(err)
              errorHandler(res, 'articles/detail')
            })
        }
      })
      .catch(err => {
        console.log(err)
        errorHandler(res, 'articles/list')
      })
  },
  delete: (req, res) => {
    let id = req.params.id

    Article
      .findById(id)
      .then(article => {
        if (!canEditArticle(req, article)) {
          article.globalError = 'You can delete only your own articles.'
          res.render('articles/detail', article)
          return
        }

        article
          .remove()
          .then(article => {
            res.redirect(`/articles/list`)
          })
          .catch(err => {
            console.log(err)
            errorHandler(res, 'articles/detail')
          })
      })
      .catch(err => {
        console.log(err)
        errorHandler(res, 'articles/list')
      })
  }
}
