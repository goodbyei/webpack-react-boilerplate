const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const TerserWebpackPlugin  = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const plugins = [
  new HtmlWebpackPlugin({
    template: `./index.html`,
    minify: {
      collapseWhitespace: isProd
    },
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: filename('css'),
  })
]

const optimization = {
  splitChunks: {
    chunks: 'all'
  },
  minimizer: [
    new TerserWebpackPlugin(),
    new OptimizeCssAssetsPlugin()
  ]
}

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: `./index.js`,
  output: {
    filename: filename('js'),
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ]
          }
        }
      },
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
  optimization,
  devServer: {
    host: '0.0.0.0',
    port: '9000',
    stats: 'minimal',
    historyApiFallback: true,
    hot: isDev,
  }
}
