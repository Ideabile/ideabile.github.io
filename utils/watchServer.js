const child_process = require('child_process')
const chokiard = require('chokidar')

let server
let tries = 0

const spawn = () => {
  // Setup child process for server
  server = child_process.spawn('node', [`${__dirname}/../server/index.js`])
  server.stdout.on('data', (data) => {
    console.log(`Server: ${data}`)
  })
  server.stderr.on('data', (data) => {
    console.error(`Server err: ${data}`)
  })
  server.on('close', (code) => {
    tries++
    console.log(`Server close: ${code}`)
    if (tries < 3) {
      console.log('Retry to restart')
      return spawn()
    }
    console.error('Tries reach the limit check your code')
  })
}

process.on('exit', function() {
  tries = 3
  server.kill('SIGHUP')
})

module.exports = {
  start: () => {
    spawn()
  },
  watch: () => {
    // Setup watcher
    const watcher = chokiard.watch(`${__dirname}/../server`)
    watcher.on('ready', () => {
      watcher.on('all', () => {
        console.log("Restarting server")
        tries = 3
        server.kill('SIGHUP')
        setTimeout(()=>{
          tries = 0
          spawn()
        }, 1000)
      })
    })
  },
  stop: () => {
    tries = 3
    server.kill('SIGHUP')
  },
  restart: () => {
    tries = 0
    server.kill('SIGHUP')
  }
}
