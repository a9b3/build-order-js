import Server from './server.js'
import config from '../config.js'

async function main() {
  const server = new Server()
  await server.listen(config.port)
  console.log(`listening on port ${config.port}`)
}

try {
  console.log(`Starting server with following configs\n`, config)
  main()
} catch (e) {
  console.log('ERROR', e)
}
