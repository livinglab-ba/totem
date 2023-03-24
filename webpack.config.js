var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const GoogleFontsPlugin = require("google-fonts-webpack-plugin")
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: './client/main.ts',
  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist'),
    filename: 'app.bundle.js'
  },
  
  module: {
    loaders: [
      // .ts files for TypeScript
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader?{tsconfig: "tsconfig.json"}'
        ]
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },

  resolve: {
    extensions: ['.js', '.ts', '.html', '.css']
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '../client'),
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
      }
    }),
    // new GoogleFontsPlugin({
    //     fonts: [
    //         { family: "Roboto", variants: [ "100", "300", "400" ] }
    //     ]
    //     /* ...options */
    // }),
    new CopyWebpackPlugin([
      { from: 'client/pages/images', to: 'images' },
      { from: 'client/i18n', to: 'i18n' }
    ])
  ]

};
