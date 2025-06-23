// bundler/webpack.prod.js
const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = merge(commonConfiguration, {
  mode: 'production',

  // ← add this
  output: {
    path: path.resolve(__dirname, '../public'),    // <-- emit into /public
    filename: '[name].[contenthash].js',            // your hashed bundles
    publicPath: '/',                                // so index.html refs them correctly
  },

  plugins: [
    new CleanWebpackPlugin(),                       // will wipe public/ on each build
  ],
});
