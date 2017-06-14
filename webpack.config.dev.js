const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  context: path.join(__dirname, './src'),

  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      './index.js',
    ],
    vendors: [
      'antd',
      'classnames',
      'd3',
      'jwt-decode',
      'lodash',
      'query-string',
      'react',
      'react-addons-transition-group',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-router-scroll',
      'recharts',
      'redux',
      'redux-actions',
      'redux-thunk',
      'reselect',
      'whatwg-fetch',
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].[hash].js',
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', '[name].[hash].js'),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
    }),
    new webpack.ProvidePlugin({
      html2canvas: 'html2canvas',
      $: 'jquery',
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('style-loader', '!css-loader!postcss-loader'),
      },
      {
        test: /\.css$/,
        exclude: path.join(__dirname, 'src'),
        loader: 'style!css',
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader'),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?prefix=img/&limit=10000',
      },
      // {
      //   test: /\.(woff|woff2|ttf|eot)$/,
      //   loader: 'url-loader?prefix=font/&limit=10000',
      // },
      {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?prefix=font/&limit=10000',
      },
    ],
  },

  postcss: [autoprefixer],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
