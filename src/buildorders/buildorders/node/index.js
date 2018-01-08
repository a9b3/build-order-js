import * as tasks from '../../tasks'
import taskAPI    from 'taskAPI'

export default async function nodeApp({ flags }) {
  await tasks.bootstrap({ name: flags.name })
  await tasks.mocha()
  await tasks.eslint({ extend: 'eslint-config-esayemm' })

  await taskAPI.addPackages({
    packages: ['jbs-node', 'babel-register', 'babel-polyfill'],
    dev: true,
  })

  await taskAPI.addToPackageJson({
    json: {
      main: `./build/index.js`,
      scripts: {
        build:
          './node_modules/jbs-node/bin.js build --input src --output build',
        prepublish: 'npm run build',
        preversion: 'npm run lint && npm run test',
        version: 'npm publish',
        postversion: 'git add . && git push && git push --tags',
      },
      babel: {
        presets: ['./node_modules/jbs-node/configs/babel-preset-jbs-node.js'],
      },
      files: ['build/'],
    },
  })

  await taskAPI.shell({ command: `mkdir src` })
  await taskAPI.shell({ command: `touch src/index.js` })

  await taskAPI.addFile({
    dest: './index.js',
    fileContent: [
      `// use this for dev`,
      `require('babel-register')`,
      `require('babel-polyfill')`,
      `require('./src')`,
    ].join('\n'),
  })

  if (flags.git) {
    await taskAPI.gitInit()
  }
}
