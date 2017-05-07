const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');
const marked = require('marked');
const url = require('url');
const contentDir = path.join( __dirname, '../content/' );
const _ = require('underscore');
const contentUtils = require('./content');
const Hapi = require('hapi')
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: (process.env.PORT_CONTENT || process.env.npm_package_config_content_port || 3051),
  routes: {
    cors: true
  }
})

function getSummaryByCategory(item, category){
  item = _.filter(item, (item) => {
    return item.category === category
  })

  let summary = {};
  _.each(item, (item)=>{
    if(! summary[item.name]){
      summary[item.name] = item;
    }else{
      summary[item.name].hours += item.hours;
    }
  })

  return summary;
}

function getAllMarkDownFilesFromDir( dir ){
  let files = fs.readdirSync(`${contentDir}/${dir}`);
  let items = [];

  for(let k in files){
    if(files[k].indexOf('.md') > -1){
      items.push(Object.assign({}, contentUtils.getPage(`/${dir}/${files[k]}`), {file: files[k].replace('.md','') }));
    }
  }

  return items;
}

function getAllExperiences(){
  return getAllMarkDownFilesFromDir('experiences')
}

function getResume( category ){
  let experiences = getAllExperiences();
  if(category) return getSummaryByCategory(experiences, category);
  return experiences
}

function isExistingContentDirectory( path ){
  return fs.existsSync(`${contentDir}/${path}`)
}

function getPath(url){
  return url.pathname.split('/')
}

server.route({
  method: 'GET',
  path: '/experiences/resume',
  handler: (req, res)=>{
    res({experiences: getResume()});
  }
})

server.route({
  method: 'GET',
  path: '/articles/',
  handler: (req, res)=>{
    res({articles: getAllMarkDownFilesFromDir('articles')});
  }
})

server.route({
  method: 'GET',
  path: '/articles/{id}',
  handler: (req, res)=>{
    if(isExistingContentDirectory(`articles/${req.params.id}`)){
      return res(contentUtils.getPage(`articles/${req.params.id}`));
    }
    res('Not found');
  }
})

server.route({
  method: 'GET',
  path: '/experiences/{id}',
  handler: (req, res) => {
    if(isExistingContentDirectory(`experiences/${req.params.id}`)){
      return res(contentUtils.getPage(`experiences/${req.params.id}`));
    }

    res('Not found');
  }
})

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
})
