import path       from 'path'
import * as tasks from '../../tasks'

/*
 * refer to commands/index.js for the opts passed into this function
 *
 * args used
 * --git
 */
export default async function node(opts) {
  const taskApi = opts.taskApi
  opts.flags.buildorderType = 'node'

  await tasks.bootstrap(opts)
  await tasks.babel(opts)
  await tasks.eslint(opts)
  await tasks.test(opts)
  await tasks.ci(opts)

  await taskApi.addPackages({
    packages: [
      'babel-register',
      'babel-polyfill',
    ],
    dev: true,
  })

  await taskApi.addToPackageJson({
    json: {
      main: `es/index.js`,
      scripts: {
        preversion: 'npm run eslint && npm run test',
        version: 'npm run babel && git add .',
        postversion: 'npm publish && git push && git push --tags',
      },
    },
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })

  await taskApi.addFile({
    dest: './index.js',
    fileContent: [
      `require('babel-register')`,
      `require('babel-polyfill')`,
      `require('./src')`,
    ].join('\n'),
  })

  if (opts.flags.git) {
    await taskApi.gitInit()
  }

}
