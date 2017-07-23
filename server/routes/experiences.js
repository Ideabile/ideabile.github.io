const experiences = require('../../utils/content/experiences')
const _ = require('underscore')

module.exports = [
  {
    method: 'GET',
    path: '/experiences/all',
    handler(req, res) {
      res({experiences: experiences.contentList});
    }
  },
  {
    method: 'GET',
    path: '/experiences/{id}',
    handler(req, res) {
      let id = req.params.id
      let exp = _(experiences.contentList).filter((exp) => exp.file === id)

      if (exp.length > 0) {
        return res(exp[0])
      }

      res({msg: 'Not found'}).code(404)
    }
  }
]
