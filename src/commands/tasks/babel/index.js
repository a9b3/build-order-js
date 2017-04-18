import invariant        from 'invariant'
import * as helper      from 'services/helper'
import { allowedTypes } from '../allowed-types.js'

/*
 * buildorderType
 * none  - es-2015 and stage-0
 * react - react preset
 */
export default async function babel({
  flags: {
    buildorderType = 'default',
    babelOutdir,
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
        'babel': `rm -rf ${babelOutdir} && ./node_modules/babel-cli/bin/babel.js src --out-dir ${babelOutdir} --copy-files`,
      },
    },
  })

  /*
   * .babelrc
   */
  await taskApi.addToJsonFile({
    dest: '.babelrc',
    json: {
      "presets": [
        'stage-0',
        ['es2015', { 'modules': false }],
        buildorderType === 'react' && 'react',
      ].filter(a => a),
      "plugins": [
        "transform-runtime",
        "transform-decorators-legacy",
        "transform-class-properties",
        buildorderType === 'react' && 'react-hot-loader/babel',
      ].filter(a => a),
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
