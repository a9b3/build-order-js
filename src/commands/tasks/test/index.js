import path             from 'path'
import invariant        from 'invariant'
import { allowedTypes } from '../allowed-types.js'

/*
 * buildorderType
 * default   - mocha/expect
 * frontend  - mocha/expect/sinon, karma, webpack
 * react     - mocha/expect/sinon, karma, webpack, enzyme
 */
export default async function test({
  flags: {
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
  }
  packages.frontend = [
    'expect',
    /* need to use this for import style */
    'sinon@2.0.0-pre.3',
    'babel-register',
    'babel-polyfill',
  ]
  packages.react = packages.frontend.concat([
    'enzyme',
  ])
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
  }
  scripts.frontend = {
    'test': 'NODE_ENV=test ./node_modules/js-build-scripts/bin.js karma',
    'test:watch': 'NODE_ENV=test ./node_modules/js-build-scripts/bin.js karma:watch',
  }
  scripts.react = scripts.frontend
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
      src: path.resolve(__dirname, './templates/frontend/test'),
      dest: './test',
    })
  } else {
    await taskApi.copyDirectory({
      src: path.resolve(__dirname, './templates/mocha/test'),
      dest: './test',
    })
  }

}
