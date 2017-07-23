const experiences = require('../../utils/content/experiences')
const _ = require('underscore')

function getSummaryDetailsBasedOnCategory ( categoryName ) {
  const list = []
  experiences.contentList.forEach(experience => {
    experience.attributes.details.forEach(detail => {
      if(detail.category !== categoryName) return
      if(list.indexOf(detail.name) > -1) return
      list.push(detail.name)
    })
  })
  return list
}

module.exports = [
  {
    method: 'GET',
    path: '/summary/skills',
    handler(req, res) {
      res(getSummaryDetailsBasedOnCategory('skills'))
    }
  },
  {
    method: 'GET',
    path: '/summary/programming-languages',
    handler(req, res) {
      res(getSummaryDetailsBasedOnCategory('programming_languages'))
    }
  },
  {
    method: 'GET',
    path: '/summary/software',
    handler(req, res) {
      res(getSummaryDetailsBasedOnCategory('software'))
    }
  },
  {
    method: 'GET',
    path: '/summary/languages',
    handler(req, res) {
      res(getSummaryDetailsBasedOnCategory('languages'))
    }
  }
]
