const path = require("path")

process.env.BABEL_ENV = 'renderer'

module.exports = {
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src/renderer'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.css']
  },
  node: {
    __dirname: false
  }
}