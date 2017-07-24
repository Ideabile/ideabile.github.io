const cluster = require('cluster')
const spawn = require('child_process').spawn
const server = require('./server/index')
const type = process.argv.slice(2)[0] || 'dev'

if (cluster.isMaster) {
  server.start()
  if(type === 'generate') server.cache()

  // Launch nuxt has worker
  cluster.fork()
  cluster.on('exit', (worker, code, signal) => {
    server.stop()
  })

} else {

  const generate = spawn('npm', ['run', type], {stdio: 'inherit'})

  generate.on('close', (code, signal) => {
    process.exit(code)
  })

}
