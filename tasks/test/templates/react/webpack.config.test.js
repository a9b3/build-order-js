'use strict'

const path = require('path')
const webpack = require('webpack')
const webpackPlugins = require('webpack-load-plugins')()
const port = process.env.PORT || 8080
const CONFIG = require('./config.js')

function wpModule() {
  const loaders = {
    js: {
      test: /\.jsx?$/,
      exclude: /\/node_modules\//,
      loaders: [ 'babel' ],
    },
    styles: {
      test: /\.scss$/,
      loaders: [
        'style?sourceMap',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]&sourceMap',
        'postcss',
        'sass?sourceMap',
      ],
    },
    css: {
      test: /\.css$/,
      loaders: [
        'style?sourceMap',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]&sourceMap',
        'postcss',
      ],
    },
    html: {
      test: /\.html$/,
      loaders: [ 'html' ],
    },
    images: {
      test: /\.(png|jpe?g|gif|svg|ico)$/i,
      loaders: [
        env === 'production' ? 'url-loader?limit=8192' : 'url-loader',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
      ],
    },
    fonts: {
      test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i,
      loaders: [
        env === 'production' ? 'url-loader?limit=10000' : 'url-loader',
      ],
    },
    json: {
      test: /\.json$/i,
      loaders: [ 'json' ],
    },
    sounds: {
      test: /\.(mp3|m4a|wav)$/i,
      loaders: [
        'file',
      ],
    },
  }

  return {
    loaders: Object.keys(loaders).map(key => loaders[key]),
  }
}

function plugins() {
  let pluginsConfigs = [
    new webpackPlugins.html({
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
      'CONFIG': JSON.stringify(CONFIG),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      CSSModules: 'react-css-modules',
    }),
  ]

  pluginsConfigs = pluginsConfigs.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ])

  return pluginsConfigs
}

// Webpack config
const configs = {
  module: wpModule(),
  plugins: plugins(),
  resolve: {
    alias: {
      // ensure one instance of react
      react: path.resolve('./node_modules/react'),
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./src/app'),
      'node_modules',
    ],
  },
  postcss() {
    return [
      require('postcss-import'),
      require('autoprefixer'),
      require('precss'),
    ]
  },
  // used by image-webpack loader
  debug: true,
  // http://webpack.github.io/docs/build-performance.html
  // recommendation: 'eval-source-map',
  // 'eval' is the fastest if you don't care about source-map
  devtool: 'eval-source-map',
}

module.exports = configs
