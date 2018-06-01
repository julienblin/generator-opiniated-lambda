const path = require('path');
const slsw = require('serverless-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const entries = {};

Object.keys(slsw.lib.entries).forEach(key => (
  entries[key] = ['./build/source-map-install.js', slsw.lib.entries[key]]
));

module.exports = {
  entry: entries,
  devtool: 'source-map',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  target: 'node',
  stats: slsw.lib.webpack.isLocal ? 'normal' : 'minimal',
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.ts'
    ],
    plugins: [
      new TsconfigPathsPlugin()
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.ts(x?)$/, loader: 'ts-loader' },
    ],
  },
  externals: {
    "aws-sdk": "aws-sdk"
  }
};
