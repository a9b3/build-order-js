import path from 'path'
import * as tasks from '../../tasks'

/*
 * refer to commands/index.js for the opts passed into this function
 *
 * args used
 * --git
 */
export default async function cli(opts) {
  const taskApi = opts.taskApi
  opts.options.buildorderType = 'node'

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

  const name = opts.options.name || 'changeMe'
  await taskApi.addToPackageJson({
    json: {
      scripts: {
        preversion: 'npm run eslint && npm run test',
        version: 'npm run babel && git add .',
        postversion: 'git push && git push --tags && npm publish',
      },
      preferGlobal: true,
      'bin': {
        [name]: './bin/index.js',
      },
    },
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/bin'),
    dest: './bin',
  })

  await taskApi.addFile({
    dest: './index.js',
    fileContent: [
      `// use this for dev, prod will use ./bin/index.js`,
      `require('babel-register')`,
      `require('babel-polyfill')`,
      `require('./src')`,
    ].join('\n'),
  })

  if (opts.options.git) {
    await taskApi.gitInit()
  }

}
