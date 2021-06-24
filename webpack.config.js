const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jpg$/,
        loader: "url-loader?mimetype=image/png" 
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.pug$/,
        use: [
          "html-loader",
          "pug-html-loader"
        ]
      },
      {
        test: /\.html$/,
        use: [
        // {
        //   loader: 'ejs-loader'
        // },
        // {
        //   loader: 'extract-loader'
        // },
        {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }
      ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
              sourceMap: true
          }
        },
        {
            loader: "css-loader",
            options: {
                sourceMap: true
            }
        },
        {
            loader: "sass-loader",
            options: {
                sourceMap: true
            }
        }]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js",
      React: "react/index.js"
    }),
    new HtmlWebPackPlugin({
      filename: "./index.html",
      template: path.resolve(__dirname, './src/template/pages/index.html'),
      title: 'HTML Webpack Plugin',
      
    }),
    new HtmlWebPackPlugin({
      filename: "./thank-online.html",
      template: path.resolve(__dirname, './src/template/pages/thank-online.html'),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      { from: './src/assets/images', to: './assets/images' },
      { from: './src/assets/fonts', to: './assets/fonts' },
    ])
  ],
  resolve: {
    alias: {
      GrapeC: path.resolve(__dirname, "src/grapeComponents")
    }
  }
};