import path from 'path'
import invariant from 'invariant'
import { allowedTypes } from '../allowed-types.js'

// buildorderType 'default' 'react'
export default async function test({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    buildorderType = 'default',
  } = {},
  taskApi,
}) {
  invariant(!!~allowedTypes.indexOf(buildorderType), `--test-type must be one of these values '${allowedTypes}'`)

  /*
   * npm packages
   */
  const packages = {
    default: [
      'babel-register',
      'babel-polyfill',
      'mocha',
      'expect',
    ],
    react: [
      'enzyme',
      'mocha',
      'expect',
      /* need to use this for import style */
      'sinon@2.0.0-pre.3',
      'karma',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
  }

  await taskApi.addPackages({
    packages: packages[buildorderType] || packages.default,
    dev: true,
  })

  /*
   * package.json
   */

  const scripts = {
    default: {
      'test': `NODE_ENV=test ./node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill $(find . -name '*.spec.js' ! -ipath '*node_modules*')`,
      'test:watch': `NODE_ENV=test ./node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill --watch $(find . -name '*.spec.js' ! -ipath '*node_modules*')`,
    },
    react: {
      'test': 'NODE_ENV=test ./node_modules/karma/bin/karma start --single-run',
      'test:watch': 'NODE_ENV=test ./node_modules/karma/bin/karma start',
    },
  }

  await taskApi.addToPackageJson({
    json: {
      scripts: scripts[buildorderType] || scripts.default,
    },
  })

  /*
   * test files
   */
  if (buildorderType === 'react') {
    await taskApi.copyDirectory({
      src: path.resolve(__dirname, './templates/react/test'),
      dest: './test',
    })
    await taskApi.addFile({
      src: path.resolve(__dirname, './templates/react/karma.conf.js'),
      dest: 'karma.conf.js',
    })
  } else {
    await taskApi.copyDirectory({
      src: path.resolve(__dirname, './templates/mocha/test'),
      dest: './test',
    })
  }

}
