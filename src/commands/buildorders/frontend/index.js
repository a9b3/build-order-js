import path       from 'path'
import * as tasks from '../../tasks'

/*
 * refer to commands/index.js for the opts passed into this function
 *
 * args used
 * --git
 */
export default async function frontend(opts) {
  const taskApi = opts.taskApi
  opts.flags.buildorderType = 'frontend'

  await tasks.bootstrap(opts)
  await tasks.babel(opts)
  await tasks.eslint(opts)
  await tasks.test(opts)
  await tasks.ci(opts)

  await taskApi.addToPackageJson({
    json: {
      scripts: {
        // docker will run 'npm run build'
        build: 'npm run webpack',
        start: 'npm run webpack:dev',
        deploy: 'npm run build && echo add continuous deployment here',
      },
    },
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })

  if (opts.flags.git) {
    await taskApi.gitInit()
  }
}
