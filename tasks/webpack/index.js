import path from 'path'
import invariant from 'invariant'
import * as helper from '../../src/helper.js'
import { allowedTypes } from '../allowed-types.js'

/*
 * buildorderType 'lib'
 */
export default async function webpack({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    buildorderType = 'default',
  } = {},
  taskApi,
}) {
  invariant(!!~allowedTypes.indexOf(buildorderType), `--buildorder-type must be one of these values '${allowedTypes}'`)

  const webpackConfigFileName = 'webpack.config.js'

  /*
   * npm packages
   */
  const packages = {
    base: [
      'webpack@2.1.0-beta.5',
      'webpack-dev-server',
      'babel-core',
      'babel-loader',
      'json-loader',
    ],
  }
  packages.frontend = [
    /* loaders */
    'css-loader',
    'file-loader',
    'html-loader',
    'url-loader',
    'style-loader',
    'sass-loader',
    'postcss-loader',
    'react-hot-loader',
    'image-webpack-loader',
    /* plugins */
    'html-webpack-plugin',
    'extract-text-webpack-plugin',
    /* css */
    'autoprefixer',
    'precss',
    'node-sass',
    'postcss-import',
    /* misc */
    'webpack-load-plugins',
    'webpack-dashboard',
  ]
  packages.react = packages.frontend

  await taskApi.addPackages({
    packages: helper.concatMappedArrays(['base', buildorderType], packages),
    dev: true,
  })

  /*
   * package.json
   */
  await taskApi.addToPackageJson({
    json: {
      scripts: {
        'webpack': `rm -rf build && ./node_modules/webpack/bin/webpack.js --config ${webpackConfigFileName}`,
      },
    },
  })

  /*
   * webpack config file
   */
  await taskApi.templateFile({
    src: path.resolve(__dirname, `./templates/${webpackConfigFileName}`),
    args: {
      buildorderType,
    },
    dest: `${webpackConfigFileName}`,
  })

}
