/*
 * Use for building a manual library file
 */
const webpack = require('webpack')
const path = require('path')
const env = 'production'

const configs = {
  name: 'index',
}

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: `${configs.name}.js`,
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [ path.resolve(__dirname, 'src') ],
        loaders: [ 'babel' ],
      },
      {
        test: /\.json$/,
        loaders: [ 'json' ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
    }),
  ],
  resolve: {
    modules: [
      'node_modules',
    ],
  },
}
