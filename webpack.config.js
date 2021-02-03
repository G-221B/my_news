const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  // devtool: 'source-map',
  optimization: {
    minimize: false,
  },
  entry: {
    index: resolve(__dirname, './src/js/index.js'),
    detail: resolve(__dirname, './src/js/detail.js'),
    collections: resolve(__dirname, './src/js/collections.js'),
  },
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['latest'],
        },
      },
      {
        test: /.tpl$/,
        loader: 'ejs-loader',
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')];
              },
            },
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')];
              },
            },
          },
          {
            loader: 'sass-loader',
            // options: {
            //   sourceMap: true,
            //   sourceMapContents: false
            // }
          }
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|eot|woff|ttf|svg)$/i,
        use: {
          loader: 'url-loader',
          options: {
            name: 'img/[name]-[hash:16].[ext]',
            limit: 1024
          }
        }
        // loader: 'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      title: '新闻头条',
      chunks: ['index'],
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './src/detail.html'),
      filename: 'detail.html',
      title: '新闻详情',
      chunks: ['detail'],
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './src/collections.html'),
      filename: 'collections.html',
      title: '我的收藏',
      chunks: ['collections'],
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
  },
};
