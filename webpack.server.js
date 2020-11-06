const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');

const path = require('path');

const serverConfig = {
  target: 'node',
  entry: path.resolve(__dirname, 'server/src/index.ts'),
  output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'server/dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
},
};

module.exports = merge(baseConfig, serverConfig);