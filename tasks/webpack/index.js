import path from 'path'
import invariant from 'invariant'

function getWebpackConfigFileName(webpackType) {
  const allowedTypes = ['lib']
  invariant(allowedTypes.indexOf(webpackType) !== -1, `'${webpackType}' not an allowed --webpack-type '${allowedTypes}'`)
  return `webpack.${webpackType}.config.js`
}

/*
 * webpackType 'lib'
 */
export default async function webpack({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    webpackType = 'lib',
  } = {},
  taskApi,
}) {

  await taskApi.addPackages({
    packages: [
      'webpack@2.1.0-beta.5',
      'webpack-dev-server',
      'babel-core',
      'babel-loader',
      'json-loader',
    ],
    dev: true,
  })

  const webpackConfigFileName = getWebpackConfigFileName(webpackType)
  await taskApi.addToPackageJson({
    json: {
      scripts: {
        'webpack': `rm -rf build && ./node_modules/webpack/bin/webpack.js --config ${webpackConfigFileName}`,
      },
    },
  })

  await taskApi.addFile({
    src: path.resolve(__dirname, `./templates/${webpackConfigFileName}`),
    dest: `${webpackConfigFileName}`,
  })

}
