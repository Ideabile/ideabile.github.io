const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');
const marked = require('marked');
const showdown = require('showdown');
require('showdown-youtube');
const contentDir = path.join( __dirname, '../content/' );
const mediaConverter = new showdown.Converter({extensions: ['youtube']});

module.exports = {

  getPage: function ( filePath ){
    let contentPath = `${contentDir}/${filePath}`;
    let isNotAFile = ( !fs.existsSync( contentPath ) || fs.lstatSync( contentPath ).isDirectory() );

    if( isNotAFile ){
      return false;
    }

    let content  = fs.readFileSync(contentPath, {encoding: 'utf-8'});
    let obj = frontMatter(content);
    obj.body = marked(mediaConverter.makeHtml(obj.body));
    if(obj.frontmatter) delete obj.frontmatter;
    return obj;
  }

};
