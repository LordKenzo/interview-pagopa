

const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      modules: ['node_modules']
  },
  module: {
      rules: [
          {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/
          },
      ]
  }
};