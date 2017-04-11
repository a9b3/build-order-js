<% if (!!~['isomorphic', 'node'].indexOf(buildorderType)) { %>
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
    filename: configs.name + `.js`,
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [ path.resolve(__dirname, 'src') ],
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.json$/,
        use: [
          'json-loader',
        ],
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
  <% if (buildorderType === 'node') { %>
  target: 'node',
  <% } %>
}
<% } else if (buildorderType) { %>
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractText = require('extract-text-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack')
const config = {
  // development, production, test
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
}

const webpackConfig = {
  entry: {
    // generally just need one entry file, but if you want another tag for
    // something like google analytics script you can add to this array
    app: ['./src/app/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].[hash].bundled.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /\/node_modules\//,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: config.env === 'production'
          ?
            ExtractText.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  query: {
                    modules: true,
                    importLoaders: '1',
                    localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                  },
                },
                'postcss-loader',
                'sass-loader',
              ],
            })
          :
            [
              'style-loader?sourceMap',
              'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]&sourceMap',
              'postcss-loader',
              'sass-loader?sourceMap',
            ],
      },
      {
        test: /\.css$/,
        use: config.env === 'production'
          ?
            ExtractText.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  query: {
                    modules: true,
                    importLoaders: '1',
                    localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                  },
                },
                'postcss-loader',
                'sass-loader',
              ],
            })
          :
            [
              'style-loader?sourceMap',
              'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]&sourceMap',
              'postcss-loader',
            ],
      },
      {
        test: /\.html$/,
        use: [
          'html-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        use: [
          config.env === 'production' ? 'url-loader?limit=8192' : 'url-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optimizationLevel: 7,
              interfaced: false,
            },
          },
        ].filter(a => a),
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i,
        use: [
          config.env === 'production' ? 'url-loader?limit=10000' : 'url-loader',
        ],
      },
      {
        test: /\.json$/i,
        use: [
          'json-loader',
        ],
      },
      {
        test: /\.(mp3|m4a|wav)$/i,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  // https://github.com/webpack/docs/wiki/list-of-plugins
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(config.env),
      },
    }),
    <% if (!!~['react'].indexOf(buildorderType)) { %>
    new webpack.ProvidePlugin({
      React: 'react',
      CSSModules: 'react-css-modules',
      PropTypes: 'prop-types',
    }),
    <% } %>
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // https://github.com/jantimon/favicons-webpack-plugin
    // Uncomment and add location to your favicon
    //new FaviconsWebpackPlugin({
    //  logo: './src/assets/favicon.png',
    //  icons: {
    //    favicons: true,
    //  },
    //}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
    }),
    // debug: true on top level webpack config was removed in webpack2 update
    // passing debug options to loaders directly this is the interim solution
    // need to fix image-webpack loader
    new webpack.LoaderOptionsPlugin({
      debug: config.env === 'development',
      options: {
        context: path.resolve(__dirname, 'src'),
        postcss: [
          require('autoprefixer'),
        ],
      },
    }),
    config.env === 'development' && new webpack.NamedModulesPlugin(),
    config.env === 'development' && new webpack.NoEmitOnErrorsPlugin(),
    config.env === 'production' && new ExtractText({
      filename: '[name].[hash].bundle.css',
    }),
    config.env === 'production' && new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200,
    }),
    config.env === 'production' && new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compressor: {
        warnings: false,
      },
    }),
  ].filter(a => a),
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./src/app'),
      'node_modules',
    ],
  },
}

if (config.env === 'test') {
  delete webpackConfig.entry
  delete webpackConfig.output
}

if (config.env !== 'production') {
  // http://webpack.github.io/docs/build-performance.html
  // recommendation: 'eval-source-map',
  // 'eval' is the fastest if you don't care about source-map
  webpackConfig.devtool = 'eval-source-map'
}

module.exports = webpackConfig
<% } %>
