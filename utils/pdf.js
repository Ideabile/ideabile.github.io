const experiences = require('./content/experiences')
const htmlToPdf = require('html5-to-pdf')
const fs = require('fs')

const example = experiences.contentList[experiences.contentList.length - 1].body
const html = `<html><head><link rel="stylesheet" href="./static/print.css" /></head><body>${example}</body></html>`

// const pdf = new htmlToPdf({
//   inputBody: example,
//   include: [
//     {
//       type: 'css',
//       filePath: 'static/print.css'
//     }
//   ]
// })

// pdf.build((err, buf) => {
// })

fs.writeFile('./cv.html', html, 'utf8', (err) => {
  console.log(err)
})
