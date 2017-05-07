var fs = require('fs');
const { join } = require('path');
var _ = require('underscore');
var utilsContent = require('./utils/content');

let listArticles = (()=>{
  return _.filter(fs.readdirSync(join(__dirname, '/content/articles'), (item)=>{
    return item.indexOf('.md') > -1
  })).map( (page) => {
    return Object.assign({}, utilsContent.getPage(`articles/${page}`) || {}, {
      file: page.replace('.md','')
    });
  });
})();

let listExperiences = (()=>{
  return _.filter(fs.readdirSync(join(__dirname, '/content/experiences'), (item)=>{
    return item.indexOf('.md') > -1
  })).map( (page) => {
    return Object.assign({}, utilsContent.getPage(`experiences/${page}`) || {}, {
      file: page.replace('.md','')
    });
  });
})();

let routesExperiences = listExperiences.map((obj) => {
  return {id: obj.file}
});
let routesArticles =  listArticles.map((obj) => {
  return {id: obj.file}
});
routesExperiences.push({id: 'index'});
routesArticles.push({id: 'index'});

module.exports = {
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      {href: "/main.css", type: "text/css", rel: "stylesheet", media: "all" }
    ]
  },
  env: {
    content: {
      me: utilsContent.getPage('me.md'),
      experiences: listExperiences,
      blog: listArticles
    }
  },
  loading: false,
  generate: {
    routeParams:{
      '/experience/:id': routesExperiences,
      '/blog/:id': routesArticles,
      '/': [
        {id: 'index'}
      ]
    }
  },
  build: {
    extend (config){
      config.node = Object.assign(config.node || {}, {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      });
    }
  }
};
