import * as tasks from '../../tasks'
import path from 'path'
import taskAPI from 'taskAPI'

export default async function express({ flags }) {
  await tasks.bootstrap({ name: flags.name })
  await tasks.mocha()
  await tasks.eslint({ extend: 'eslint-config-esayemm' })
  await tasks.ci()
  await tasks.docker()
  await taskAPI.addPackages({
    devPackages: ['jbs-node', 'babel-register', 'babel-polyfill', 'axios'],
    packages: [
      'express',
      'body-parser',
      'cors',
      'babel-register',
      'babel-polyfill',
      'bunyan',
      'js-functions',
      'helmet',
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
  await taskAPI.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })
  await taskAPI.copyDirectory({
    src: path.resolve(__dirname, './templates/test'),
    dest: './test',
  })
  if (flags.git) {
    await taskAPI.gitInit()
  }
}
