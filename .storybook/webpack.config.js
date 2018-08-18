process.env.BABEL_ENV = 'renderer'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const { PRODUCTION } = require('../.electron-vue/utils')

module.exports = {
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src/renderer'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.css']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== PRODUCTION
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env.IS_WEB': 'true'
    })
  ]
}