const fse = require('fs-extra')
const Hapi = require('hapi')
const server = new Hapi.Server()
const port = process.env.PORT_CONTENT
      || process.env.npm_package_config_content_port
      || 3051


server.connection({
  host: 'localhost',
  port,
  routes: {
    cors: true
  }
})

server.route(require('./routes/experiences'))
server.route(require('./routes/articles'))
server.route(require('./routes/summary'))

// Enable Caching objects
if (process.argv.slice(2).indexOf('generate') > -1){
  server.ext('onPreResponse', function (request, reply) {
    let source = request.response.source;
    let path = request.path
    let filePath = `${__dirname}/../dist/api/${path}.json`

    fse.ensureFile(filePath, () => {
      fse.writeJsonSync(filePath, source)
    })

    return reply.continue();
  })
}

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri)
})


const catchExit = ( err ) => {
  if (err) console.log(err.stack)
  server.stop((err) => {

  })
}

const bindings = ['exit', 'SIGINT', 'uncaughtExpception']
bindings.forEach(binding => process.on.bind(null, binding, catchExit))
