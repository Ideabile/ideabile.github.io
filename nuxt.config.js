var fs = require('fs');
const { join } = require('path');
var _ = require('underscore');
var utilsContent = require('./utils/content');
const mainUrl = process.env.BASE_URL || 'http://localhost:3050';

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

let Routes = []
Routes = Routes.concat(routesArticles.map(obj => `/blog/${obj.id}`))
Routes = Routes.concat(routesExperiences.map(obj => `/experience/${obj.id}`))

module.exports = {
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      {href: `${mainUrl}main.css`, type: "text/css", rel: "stylesheet", media: "all" }
    ],
    script: [
      { src: `${mainUrl}ga.js` }
    ]
  },
  env: {
    baseUrl: mainUrl,
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
    },
    routes: Routes
  },
  build: {
    publicPath: mainUrl,
    extend (config){
      config.node = Object.assign(config.node || {}, {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      });
    }
  }
};
