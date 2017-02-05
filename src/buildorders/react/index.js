import path from 'path'
import * as tasks from '../../tasks/index.js'

/*
 * refer to commands/index.js for the opts passed into this function
 *
 * args used
 * --git
 */
export default async function react(opts) {
  const taskApi = opts.taskApi
  opts.options.buildorderType = 'react'

  await tasks.bootstrap(opts)
  await tasks.babel(opts)
  await tasks.eslint(opts)
  await tasks.webpack(opts)
  await tasks.test(opts)
  await tasks.ci(opts)
  await tasks.docker(Object.assign({}, opts, {
    options: Object.assign({}, opts.options, {
      dockerTarget: 'frontend',
    }),
  }))

  await taskApi.addToPackageJson({
    json: {
      scripts: {
        // docker will run 'npm run build'
        build: 'npm run webpack',
        start: 'npm run webpack:dev',
        deploy: 'npm run build && echo add continuous deployment here',
      },
    },
  })

  await taskApi.addPackages({
    packages: [
      'react-addons-test-utils',
      'react-hot-loader@3.0.0-beta.6',
    ],
  })

  await taskApi.addPackages({
    packages: [
      'react',
      'react-css-modules',
      'react-dom',
      'react-helmet',
      'react-router',
      'history',
      'html',
      'invariant',
      'esayemm-styles',
    ],
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })

  if (opts.options.git) {
    await taskApi.gitInit()
  }
}
