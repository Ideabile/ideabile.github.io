const cluster = require('cluster')
const { spawn } = require('child_process')
const stdio = 'inherit'
const type = process.argv.slice(2)[0] || 'dev'

const spawnServer = () => {
  return spawn('node', ['server/index', type], { stdio })
}


if (cluster.isMaster) {
  var server = spawnServer()

  if (type !== 'generate') {

    // Create server
    const chokidar = require('chokidar')
    const watcher = chokidar.watch(`${__dirname}/server`)
    watcher.add(`${__dirname}/content`)

    Promise.resolve(
      new Promise((resolve, reject) => {
        watcher.on('ready', resolve)
        watcher.on('error', reject)
        // Start watching
      }).then((resolve, reject) => {
        watcher.on('all', () => {
          server.kill('SIGHUP')
          setTimeout(() => {
            console.log('RESTART! \\ o /')
            server = spawnServer()
          }, 1000)
        })
      }).catch((err) => {
        console.log(err.stack)
      })
    )

  }

  ['SIGHUP', 'exit'].forEach(exit => {
    process.on.bind(null, exit, ()=>{
      server.kill('SIGHUP')
      if (!!watcher) watcher.closer()
    })
  })

  // Launch nuxt has worker
  cluster.fork()
  cluster.on('exit', (worker, code, signal) => {
    server.kill('SIGHUP')
  })

} else {
  const generate = spawn('npm', ['run', type], { stdio })
  generate.on('close', (code, signal) => {
    process.exit(code)
  })
}
