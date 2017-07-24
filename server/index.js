const fse = require('fs-extra')
const Hapi = require('hapi')
const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: (process.env.PORT_CONTENT || process.env.npm_package_config_content_port || 3051),
  routes: {
    cors: true
  }
})

server.route(require('./routes/experiences'))
server.route(require('./routes/articles'))
server.route(require('./routes/summary'))



module.exports = {

  start () {
    server.start((err) => {
      if (err) {
        throw err;
      }
      console.log('Server running at:', server.info.uri)
    })
  },

  cache () {
    server.ext('onPreResponse', function (request, reply) {
      let source = request.response.source;
      let path = request.path
      let filePath = `${__dirname}/../dist/api/${path}.json`

      fse.ensureFile(filePath, () => {
        fse.writeJsonSync(filePath, source)
      })

      return reply.continue();
    })
  },

  stop () {
    server.stop((err) => {
      if (err) {
        throw err
      }
      console.log('Server stop')
    })
  }

}
