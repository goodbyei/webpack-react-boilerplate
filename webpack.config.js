const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PATH_SRC = resolve(__dirname, 'src')

const plugins = [
  new HtmlWebpackPlugin({
    template: `${PATH_SRC}/index.html`
  }),
  new CleanWebpackPlugin()
]

module.exports = {
  entry: `${PATH_SRC}/index.js`,
  output: {
    filename: '[name].[contenthash].js',
    path: resolve(__dirname, 'dist')
  },
  plugins
}
