import path from 'path'
import * as helper from '../../src/helper.js'
import invariant from 'invariant'
import { allowedTypes } from '../allowed-types.js'

/*
 * buildorderType 'react'
 */
export default async function babel({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    buildorderType = 'default',
    babelOutdir = 'lib',
  } = {},
  taskApi,
}) {
  invariant(!!~allowedTypes.indexOf(buildorderType), `--babel-type flag must have one of these values '${allowedTypes}'`)

  /*
   * npm packages
   */
  const packages = {
    base: [
      'babel-plugin-transform-runtime',
      'babel-plugin-transform-class-properties',
      'babel-plugin-transform-decorators-legacy',
      'babel-preset-es2015',
      'babel-preset-stage-0',
      'babel-cli',
    ],
    react: [
      'babel-plugin-react-transform',
      'babel-preset-react',
      // enzyme needs this
      'babel-preset-airbnb',
    ],
  }

  await taskApi.addPackages({
    packages: helper.concatMappedArrays(['base', buildorderType], packages),
    dev: true,
  })

  await taskApi.addPackages({
    packages: [
      // required by babel-plugin-transform-runtime
      // https://babeljs.io/docs/plugins/transform-runtime/
      'babel-runtime',
    ],
  })

  /*
   * package.json
   */
  await taskApi.addToPackageJson({
    json: {
      scripts: {
        'babel': `rm -rf ${babelOutdir} && ./node_modules/babel-cli/bin/babel.js src --out-dir ${babelOutdir}`,
      },
    },
  })

  /*
   * .babelrc
   */
  const babelRcPresets = {
    base: [
      "stage-0",
      "es2015",
    ],
    react: [
      'react',
    ],
  }

  const babelRcPlugins = {
    base: [
      "transform-runtime",
      "transform-decorators-legacy",
      "transform-class-properties",
    ],
    react: [
      "react-hot-loader/babel",
    ],
  }

  await taskApi.addToJsonFile({
    dest: '.babelrc',
    json: {
      "presets": helper.concatMappedArrays(['base', buildorderType], babelRcPresets),
      "plugins": helper.concatMappedArrays(['base', buildorderType], babelRcPlugins),
    },
  })

  if (buildorderType === 'react') {
    await taskApi.addToJsonFile({
      dest: '.babelrc',
      json: {
        "env": {
          "test": {
            "presets": [
              "airbnb",
              "es2015",
              "stage-0",
              "react",
            ],
          },
        },
      },
    })
  }

}
