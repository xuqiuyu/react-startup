const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './client/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'tac',
    //   minChunks(module) {
    //     return /node_modules\/(za-piedom)/.test(module.userRequest || '');
    //   }
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules\/(?!za-piedom)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
        plugins: ['transform-runtime', 'add-module-exports', ['import', { libraryName: 'antd', style: true }]]
      }
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.less']
  }
};
