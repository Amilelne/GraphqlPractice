const path = require('path');

module.exports = {
  entry: './server/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(process.cwd(), 'dist')
  },
  mode: 'development',
  target: 'node',
  module: {
    rules: [{ test: /.graphqls$/, loader: 'raw-loader' }]
  }
};
