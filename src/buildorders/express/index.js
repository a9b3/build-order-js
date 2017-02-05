import path from 'path'
import * as tasks from '../../tasks'

/*
 * refer to commands/index.js for the opts passed into this function
 *
 * args used
 * --git
 */
export default async function express(opts) {
  const taskApi = opts.taskApi

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/test'),
    dest: './test',
  })

  await tasks.bootstrap(opts)
  await tasks.babel(opts)
  await tasks.eslint(opts)
  await tasks.test(opts)
  await tasks.ci(opts)
  await tasks.docker(Object.assign({}, opts, {
    options: Object.assign({}, opts.options, {
      dockerTarget: 'backend',
    }),
  }))

  await taskApi.addPackages({
    packages: [
      'axios',
    ],
    dev: true,
  })

  await taskApi.addPackages({
    packages: [
      'express',
      'body-parser',
      'cors',
      'babel-register',
      'babel-polyfill',
    ],
  })

  await taskApi.addFile({
    src: path.resolve(__dirname, './templates/index.js'),
    dest: 'index.js',
  })

  await taskApi.addFile({
    src: path.resolve(__dirname, './templates/config.js'),
    dest: 'config.js',
    overwrite: true,
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })

  if (opts.options.git) {
    await taskApi.gitInit()
  }
}
