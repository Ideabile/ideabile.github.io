const fs = require('fs');
const { join } = require('path');
const _ = require('underscore');
const utilsContent = require('./utils/content');
const mainUrl = process.env.BASE_URL || 'http://localhost:3050/';
const experiences = require('./utils/content/experiences')
const articles = require('./utils/content/articles')
const isGenerating = JSON.parse(process.env.npm_config_argv).original.indexOf('generate') > -1
const server = require('./utils/watchServer.js')

server.start()

// Start the watcher for server
if (!isGenerating) {
  server.watch()
}

// Generate Articles and Experiencs links based on file name
let routesExperiences = experiences.contentList.map((obj) => {
  return {id: obj.file}
});
let routesArticles =  articles.contentList.map((obj) => {
  return {id: obj.file}
});
routesExperiences.push({id: 'index'});
routesArticles.push({id: 'index'});

// Add Articles and Experiences on the list of roots
let Routes = []
Routes = Routes.concat(routesArticles.map(obj => `/blog/${obj.id}`))
Routes = Routes.concat(routesExperiences.map(obj => `/experience/${obj.id}`))

module.exports = {
  head: {
    title: 'Mauro Mandracchia',
    titleTemplate: '%s - Ideabile ~ Software and Communication Solutions',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      {href: `${mainUrl}main.css`, type: "text/css", rel: "stylesheet", media: "all" }
    ]
  },
  env: {
    baseUrl: mainUrl,
    generated: isGenerating,
    apiUrl: 'http://localhost:3051/',
    content: {
      me: utilsContent.getPage('me.md')
    }
  },
  plugins: [
    { src: '~plugins/ga.js', ssr: false }
  ],
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
