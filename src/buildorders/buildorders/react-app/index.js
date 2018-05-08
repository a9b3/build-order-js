import * as tasks from '../../tasks'
import path       from 'path'
import taskAPI    from 'taskAPI'

export default async function reactApp({ flags }) {
  await tasks.bootstrap({ name: flags.name })
  await tasks.storybook()
  await tasks.prettier()
  await tasks.eslint({
    packages: 'eslint-config-esayemm',
    extend: 'eslint-config-esayemm/react',
  })
  await tasks.ci()
  await taskAPI.addPackages({
    packages: [
      'react-addons-test-utils',
      'react',
      'prop-types',
      'react-dom',
      'react-helmet',
      'react-router',
      'react-router-dom',
      'history',
      'html',
      'invariant',
      'esayemm-styles',
      'classnames',
    ],
    devPackages: ['jbs-fe'],
  })
  await taskAPI.addToPackageJson({
    json: {
      main: `./build/index.js`,
      scripts: {
        build:
          'BABEL_REACT=true NODE_PATH=./src ./node_modules/jbs-fe/bin.js build --app-index ./src/index.js',
        start:
          'BABEL_REACT=true NODE_PATH=./src ./node_modules/jbs-fe/bin.js dev --app-index ./src/index.js',
        test: `BABEL_REACT=true NODE_PATH=./src ./node_modules/jbs-fe/bin.js test --single-run`,
        'test:watch': `BABEL_REACT=true NODE_PATH=./src ./node_modules/jbs-fe/bin.js test`,
        deploy: 'npm run build && echo add deployment script here',
      },
      babel: {
        presets: ['./node_modules/jbs-fe/configs/babel-preset-jbs-fe.js'],
      },
    },
  })
  await taskAPI.copy({
    src: path.resolve(__dirname, '../../templates/react-app/src'),
    dest: './src',
  })
  await tasks.makefiles({ type: 'FRONTEND' })
  if (flags.git) {
    await taskAPI.gitInit()
  }
}
