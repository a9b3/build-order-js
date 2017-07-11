import path       from 'path'
import * as tasks from '../../tasks'
import taskApi    from 'services/task-api'

export default async function nodeApp({
  flags,
}) {
  await tasks.bootstrap({ name: flags.name })
  await tasks.mocha()
  await tasks.eslint({ extend: 'eslint-config-esayemm' })

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
