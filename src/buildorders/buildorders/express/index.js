import * as tasks from '../../tasks'
import path from 'path'
import taskAPI from 'taskAPI'

export default async function express({ flags }) {
  await tasks.bootstrap({ name: flags.name })
  await tasks.mocha()
  await tasks.prettier()
  await tasks.eslint({
    packages: 'eslint-config-esayemm',
    extend: 'eslint-config-esayemm',
  })
  await tasks.ci()
  await tasks.docker()
  await taskAPI.addPackages({
    devPackages: ['jbs-node', 'babel-register', 'babel-polyfill', 'axios'],
    packages: [
      'babel-polyfill',
      'babel-register',
      'body-parser',
      'bunyan',
      'cors',
      'express',
      'helmet',
      'js-functions',
      'morgan',
    ],
  })
  await taskAPI.addToPackageJson({
    json: {
      main: `./build/index.js`,
      scripts: {
        build:
          './node_modules/jbs-node/bin.js build --input src --output build',
        deploy: 'npm run build && echo add deployment script here',
        start:
          'NODE_PATH=./src nodemon index.js | ./node_modules/bunyan/bin/bunyan --output short',
        serve: 'NODE_PATH=./build node ./build',
      },
      babel: {
        presets: ['./node_modules/jbs-node/configs/babel-preset-jbs-node.js'],
      },
    },
  })
  await taskAPI.addFile({
    src: path.resolve(__dirname, './templates/index.js'),
    dest: 'index.js',
  })
  await taskAPI.copy({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })
  await taskAPI.copy({
    src: path.resolve(__dirname, './templates/test'),
    dest: './test',
  })
  await tasks.makefiles({ type: 'BACKEND' })
  if (flags.git) {
    await taskAPI.gitInit()
  }
}
