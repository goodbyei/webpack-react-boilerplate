const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PATH_SRC = resolve(__dirname, 'src')

const isDev = process.env.NODE_ENV === 'development'

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const plugins = [
  new HtmlWebpackPlugin({
    template: `${PATH_SRC}/index.html`
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: filename('css'),
  })
]

module.exports = {
  entry: `${PATH_SRC}/index.js`,
  output: {
    filename: filename('js'),
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
      }
    ]
  },
  plugins,
  devServer: {
    host: '0.0.0.0',
    port: '9000',
    stats: 'minimal',
    historyApiFallback: true,
    hot: isDev,
  }
}
