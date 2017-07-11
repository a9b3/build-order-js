import path       from 'path'
import * as tasks from '../../tasks'

/*
 * refer to commands/index.js for the opts passed into this function
 *
 * args used
 * --git
 */
export default async function cli(opts) {
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

  await taskApi.addPackages({
    packages: [
      'app-module-path',
    ],
  })

  const name = opts.flags.name || 'changeMe'
  await taskApi.addToPackageJson({
    json: {
      scripts: {
        preversion: 'npm run eslint && npm run test',
        version: 'npm run babel && git add .',
        postversion: 'git push && git push --tags && npm publish',
      },
      preferGlobal: true,
      'bin': {
        [name+'-dev']: './index.js',
        [name]: './bin.js',
      },
    },
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })

  // add dev entry file
  await taskApi.addFile({
    dest: './index.js',
    fileContent: [
      `#!/usr/bin/env node`,
      `// use this for dev, prod will use ./bin.js`,
      `const path = require('path')`,
      `require('app-module-path').addPath(path.resolve(__dirname, './src'))`,
      `require('babel-register')`,
      `require('babel-polyfill')`,
      `require('./src')`,
    ].join('\n'),
  })
  await taskApi.shell({ command: `chmod 0755 ./index.js` })

  // add build entry file
  await taskApi.addFile({
    dest: './bin.js',
    fileContent: [
      `#!/usr/bin/env node`,
      `const path = require('path')`,
      `require('app-module-path').addPath(path.resolve(__dirname, './es'))`,
      `require('./es/index.js')`,
    ].join('\n'),
  })
  await taskApi.shell({ command: `chmod 0755 ./bin.js` })

  if (opts.flags.git) {
    await taskApi.gitInit()
  }

}
