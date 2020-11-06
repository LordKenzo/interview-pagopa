const HtmlWebPackPlugin = require('html-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const path = require('path');

const clientConfig = {
  entry: './client/src/app/App.ts',
  output: {
      filename: 'App.js',
      path: path.resolve(__dirname, './client/dist')
  },
  module: {
      rules: [
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: { minimize: !isDevelopment }
              }
            ]
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          }
      ]
  },
  plugins: [
    new HtmlWebPackPlugin({
        template: path.resolve(__dirname,"./client/public/index.html")
    })

  ],
  devServer: {
      contentBase: './client/dist',
      open: true,
      inline: false,
  }
};

module.exports = merge(baseConfig, clientConfig);