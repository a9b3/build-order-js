import path       from 'path'
import * as tasks from '../../tasks'

/*
 * refer to commands/index.js for the opts passed into this function
 *
 * args used
 * --git
 */
export default async function react(opts) {
  const taskApi = opts.taskApi
  opts.flags.buildorderType = 'react'

  await tasks.bootstrap(opts)
  await tasks.babel(opts)
  await tasks.eslint(opts)
  await tasks.webpack(opts)
  await tasks.test(opts)
  await tasks.ci(opts)
  await tasks.docker(Object.assign({}, opts, {
    flags: Object.assign({}, opts.flags, {
      dockerTarget: 'frontend',
    }),
  }))

  await taskApi.addToPackageJson({
    json: {
      scripts: {
        'watch-scss': "./node_modules/chokidar-cli/index.js 'src/**/*.scss' -c 'touch src/app/index.js'",
        // docker will run 'npm run build'
        build: 'npm run webpack',
        start: 'npm run webpack:dev & npm run watch-scss',
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
      'prop-types',
      'react-css-modules',
      'react-dom',
      'react-helmet',
      'react-router',
      'react-router-dom',
      'history',
      'html',
      'invariant',
      'esayemm-styles',
      'chokidar-cli',
    ],
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })

  if (opts.flags.git) {
    await taskApi.gitInit()
  }
}
