import * as tasks from 'buildorders/tasks'
import taskAPI    from 'taskAPI'

export default async function cli({ flags }) {
  await tasks.bootstrap({ name: flags.name })
  await tasks.mocha()
  await tasks.eslint({
    packages: 'eslint-config-esayemm',
    extend: 'eslint-config-esayemm',
  })
  await taskAPI.addPackages({
    packages: ['app-module-path'],
    devPackages: ['jbs-node', 'babel-register', 'babel-polyfill'],
  })
  // package json
  await taskAPI.addToPackageJson({
    json: {
      scripts: {
        build:
          'rm -rf build && ./node_modules/jbs-node/bin.js build --input src --output build',
        prepublish: 'npm run build',
        preversion: 'npm run lint && npm run test',
        version: 'npm publish',
        postversion: 'git add . && git push && git push --tags',
      },
      babel: {
        presets: ['./node_modules/jbs-node/configs/babel-preset-jbs-node.js'],
      },
      preferGlobal: true,
      bin: {
        [flags.name + '-dev']: './dev.entry.js',
        [flags.name]: './entry.js',
      },
      files: ['entry.js', 'dev.entry.js', 'build/'],
    },
  })
  await taskAPI.addFile({
    dest: './dev.entry.js',
    fileContent: [
      `#!/usr/bin/env node`,
      `// use this for dev, production will use ./entry.js`,
      `const path = require('path')`,
      `require('app-module-path').addPath(path.resolve(__dirname, './src'))`,
      `require('babel-register')`,
      `require('babel-polyfill')`,
      `require('./src')`,
    ].join('\n'),
    chmod: '0755',
  })
  await taskAPI.addFile({
    dest: './entry.js',
    fileContent: [
      `#!/usr/bin/env node`,
      `const path = require('path')`,
      `require('app-module-path').addPath(path.resolve(__dirname, './build'))`,
      `require('./build')`,
    ].join('\n'),
    chmod: '0755',
  })
  await taskAPI.shell({ command: `mkdir src` })
  await taskAPI.shell({ command: `touch src/index.js` })
  if (flags.git) {
    await taskAPI.gitInit()
  }
}
