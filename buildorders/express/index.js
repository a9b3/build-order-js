import path from 'path'
import * as tasks from '../../tasks/index.js'

export default async function express(opts) {
  const taskApi = opts.taskApi

  await tasks.bootstrap(opts)
  await tasks.babel(opts)
  await tasks.eslint(opts)
  await tasks.test(opts)
  await tasks.ci(opts)
  await tasks.docker(opts)

  await taskApi.addPackages({
    packages: [
      'express',
      'body-parser',
      'cors',
    ],
  })

  await taskApi.addFile({
    src: path.resolve(__dirname, './templates/index.js'),
    dest: 'index.js',
  })

  await taskApi.addFile({
    src: path.resolve(__dirname, './templates/config.js'),
    dest: 'config.js',
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })

  await taskApi.gitInit()
}
