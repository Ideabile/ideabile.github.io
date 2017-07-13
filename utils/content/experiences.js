const fs = require('fs')
const _ = require('underscore');
const { join } = require('path');
const utilsContent = require('./../content');

const experiencesFiles = _.filter(
  fs.readdirSync(
    join(__dirname, '../../content/experiences'),
    item => item.indexOf('.md') > -1
  )
)

const contentList = experiencesFiles.map( (page) => {
  return Object.assign(
    {},
    utilsContent.getPage(`experiences/${page}`) || {},
    { file: page.replace('.md','')}
  )
})

module.exports = {
  list: experiencesFiles.map( exp => exp.replace('.md', '')),
  contentList
}
