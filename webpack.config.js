const path = require('path');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');

const loadModeConfig = env => require(`./build-utils/${env.mode}.config`)(env);

module.export = env =>
  webpackMerge(
    {
      mode: env.mode,
      context: path.resolve(__dirname, 'src'),
      entry: './index.js',
      mode: 'production',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          {
            test: /\.(gif|png|jpg|svg)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  name: '[path]/[name].[ext]',
                  limit: 8292,
                },
              },
            ],
          },
          {
            test: /\.hbs$/,
            use: 'handlebars-loader',
          },
          {
            test: /\.html$/i,
            use: 'html-loader',
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new WebpackBar(),
      ],
    },
    loadmModeConfig(env),
  );
