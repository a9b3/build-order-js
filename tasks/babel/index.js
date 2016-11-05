import path from 'path'
import * as helper from '../../src/helper.js'

/*
 * babelType 'default' 'react'
 */
export default async function babel({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    babelType = 'default',
    babelOutdir = 'lib',
  } = {},
  taskApi,
}) {

  /*
   * npm packages
   */
  const npmPackages = {
    base: [
      'babel-plugin-transform-class-properties',
      'babel-plugin-transform-decorators-legacy',
      'babel-preset-es2015',
      'babel-preset-stage-0',
      'babel-cli',
    ],
    react: [
      'babel-plugin-react-transform',
      'babel-plugin-transform-runtime',
      'babel-preset-airbnb',
      'babel-preset-react',
      'babel-runtime',
    ],
  }

  await taskApi.addPackages({
    packages: helper.concatMappedArrays(['base', babelType], npmPackages),
    dev: true,
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
      "transform-decorators-legacy",
      "transform-class-properties",
    ],
    react: [
      "transform-runtime",
      "react-hot-loader/babel",
    ],
  }

  await taskApi.addToJsonFile({
    dest: '.babelrc',
    json: {
      "presets": helper.concatMappedArrays(['base', babelType], babelRcPresets),
      "plugins": helper.concatMappedArrays(['base', babelType], babelRcPlugins),
    },
  })

  if (babelType === 'react') {
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

