import * as tasks from '../../tasks'
import path       from 'path'
import taskAPI    from 'taskAPI'

export default async function reactPackage({ flags }) {
  await tasks.bootstrap({ name: flags.name })
  await tasks.storybook()
  await tasks.eslint({
    packages: 'eslint-config-esayemm',
    extend: 'eslint-config-esayemm/lib/react',
  })
  await taskAPI.addPackages({
    devPackages: [
      'jbs-fe',
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
  })
  await taskAPI.addToPackageJson({
    json: {
      main: `./build/index.js`,
      module: `./build/index.es.js`,
      scripts: {
        build:
          'BABEL_REACT=true NODE_PATH=./src ./node_modules/jbs-fe/bin.js build:package --input src --output build --es-input-file src/index.js --es-output-file build/index.es.js',
        start:
          'BABEL_REACT=true NODE_PATH=./example:./src ./node_modules/jbs-fe/bin.js dev --app-index ./example/app/index.js --html-index ./example/index.html --context ./example',
        test: `BABEL_REACT=true NODE_ENV=test ./node_modules/jbs-fe/bin.js test --single-run`,
        'test:watch': `BABEL_REACT=true NODE_ENV=test ./node_modules/jbs-fe/bin.js test`,
        prepublish: 'npm run build',
        preversion: 'npm run lint && npm run test',
        version: 'npm publish',
        postversion: 'git add . && git push && git push --tags',
      },
      babel: {
        presets: ['./node_modules/jbs-fe/configs/babel-preset-jbs-fe.js'],
      },
      files: ['build/'],
    },
  })
  await taskAPI.shell({ command: `mkdir src` })
  await taskAPI.shell({ command: `touch src/index.js` })
  await taskAPI.copyDirectory({
    src: path.resolve(__dirname, '../../templates/react-app/src'),
    dest: './example',
  })
  if (flags.git) {
    await taskAPI.gitInit()
  }
}
