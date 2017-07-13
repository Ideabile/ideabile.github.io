const fs = require('fs')
const _ = require('underscore');
const { join } = require('path');
const utilsContent = require('./../content');

const articlesFiles = _.filter(
  fs.readdirSync(
    join(__dirname, '../../content/articles'),
    item => item.indexOf('.md') > -1
  )
)

const contentList = articlesFiles.map( (page) => {
  return Object.assign(
    {},
    utilsContent.getPage(`articles/${page}`) || {},
    { file: page.replace('.md','')}
  )
})

module.exports = {
  list: articlesFiles.map( art => art.replace('.md', '')),
  contentList
}
