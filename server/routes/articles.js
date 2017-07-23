const articles = require('../../utils/content/articles')
const _ = require('underscore')

module.exports = [
  {
    method: 'GET',
    path: '/articles/all',
    handler(req, res) {
      res({articles: articles.contentList});
    }
  },
  {
    method: 'GET',
    path: '/articles/{id}',
    handler(req, res) {
      let id = req.params.id
      let exp = _(articles.contentList).filter((exp) => exp.file === id)

      if (exp.length > 0) {
        return res(exp[0])
      }

      res({msg: 'Not found'}).code(404)
    }
  }
]
