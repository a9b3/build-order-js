import path       from 'path'
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
    flags: Object.assign({}, opts.flags, {
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
      'bunyan',
      'helmet',
      'morgan',
    ],
  })

  await taskApi.addToPackageJson({
    json: {
      scripts: {
        serve: `NODE_PATH=./es node es/index.js`,
        dev: `NODE_PATH=./src nodemon index.js | ./node_modules/bunyan/bin/bunyan --output short`,
      },
    },
  })

  await taskApi.addFile({
    src: path.resolve(__dirname, './templates/index.js'),
    dest: 'index.js',
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })

  if (opts.flags.git) {
    await taskApi.gitInit()
  }
}



import path       from 'path'
import * as tasks from '../../tasks'
import taskApi    from 'services/task-api'

export default async function nodeApp({
  flags,
}) {
  await tasks.bootstrap({ name: flags.name })
  await tasks.mocha()
  await tasks.eslint({ extend: 'eslint-config-esayemm' })
  await tasks.docker()

  await taskApi.addPackages({
    packages: [
      'jbs-node',
      'babel-register',
      'babel-polyfill',
    ],
    dev: true,
  })

  await taskApi.addToPackageJson({
    json: {
      main: `./build/index.js`,
      scripts: {
        build: './node_modules/jbs-node/bin.js build --input src --output build',
        preversion: 'npm run lint && npm run test',
        version: 'npm run build && npm publish',
        postversion: 'git add . && git push && git push --tags',
      },
      babel: {
        presets: ['./node_modules/jbs-node/configs/babel-preset-jbs-node.js'],
      },
    },
  })

  await taskApi.shell({ command: `mkdir src` })
  await taskApi.shell({ command: `touch src/index.js` })

  await taskApi.addFile({
    dest: './index.js',
    fileContent: [
      `// use this for dev`,
      `require('babel-register')`,
      `require('babel-polyfill')`,
      `require('./src')`,
    ].join('\n'),
  })

  if (flags.git) {
    await taskApi.gitInit()
  }
}

