import path       from 'path'
import * as tasks from '../../tasks'
import taskApi    from 'services/task-api'

export default async function reactApp({
  flags,
}) {
  await tasks.bootstrap({ name: flags.name })
  await tasks.eslint({ extend: 'eslint-config-esayemm/lib/react' })
  await tasks.ci()

  await taskApi.addPackages({
    packages: [
      'react-addons-test-utils',
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
    ],
  })

  await taskApi.addPackages({
    packages: [
      'jbs-fe',
    ],
    dev: true,
  })

  await taskApi.addToPackageJson({
    json: {
      main: `./build/index.js`,
      scripts: {
        build: 'BABEL_REACT=true NODE_PATH=./src ./node_modules/jbs-fe/bin.js build --app-index ./src/app/index.js',
        start: 'BABEL_REACT=true NODE_PATH=./src ./node_modules/jbs-fe/bin.js dev --app-index ./src/app/index.js',
        test: `BABEL_REACT=true NODE_PATH=./src ./node_modules/jbs-fe/bin.js test --single-run`,
        'test:watch': `BABEL_REACT=true NODE_PATH=./src ./node_modules/jbs-fe/bin.js test`,
        deploy: 'npm run build && echo add deployment script here'
      },
      babel: {
        presets: ['./node_modules/jbs-fe/configs/babel-preset-jbs-fe.js'],
      },
    },
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, '../../templates/react-app/src'),
    dest: './src',
  })

  if (flags.git) {
    await taskApi.gitInit()
  }
}
