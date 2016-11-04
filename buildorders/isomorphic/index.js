import path from 'path'
import * as tasks from '../../tasks/index.js'

/*
 * refer to commands/index.js for the opts passed into this function
 *
 * args used
 * --git
 */
export default async function isomorphic(opts) {
  const taskApi = opts.taskApi

  await tasks.bootstrap(opts)
  await tasks.babel(opts)
  await tasks.eslint(opts)
  await tasks.test(opts)
  await tasks.ci(Object.assign({}, opts, {
    options: Object.assign({}, opts.options, {
      ciType: 'circle',
    }),
  }))
  await tasks.webpack(Object.assign({}, opts, {
    options: Object.assign({}, opts.options, {
      webpackType: 'lib',
    }),
  }))

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })

  if (opts.options.git) {
    await taskApi.gitInit()
  }
}
