import path from 'path'
import bootstrapTask from '../../tasks/bootstrap/index.js'
import babelTask from '../../tasks/babel/index.js'
import eslintTask from '../../tasks/eslint/index.js'
import testTask from '../../tasks/test/index.js'

export default async function express(opts) {
  const taskApi = opts.taskApi

  await bootstrapTask(opts)
  await babelTask(opts)
  await eslintTask(opts)
  await testTask(opts)

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
}
