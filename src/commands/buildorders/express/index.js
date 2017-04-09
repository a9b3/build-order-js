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
        serve: `NODE_PATH=./${opts.flags.babelOutdir} node ${opts.flags.babelOutdir}/index.js`,
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
