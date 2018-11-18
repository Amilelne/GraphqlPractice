const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(process.cwd(), 'dist')
  },
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{ test: /.graphqls$/, loader: 'raw-loader' }]
  }
};
