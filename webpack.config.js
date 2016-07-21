var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackStrip = require('webpack-strip')
module.exports = {
  context: __dirname,
  entry: "./src/js/client.js",
  module: {
    loaders: [
     //{ test: /\.js$/, loader: WebpackStrip.loader('debug', 'console.log') },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        loaders: ["style", "css", "sass"]
      }
      /*
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader")
      },
            {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader")
      },*/
       
    ]
  },
  output: {
    path: __dirname + "/dist/js/",
    filename: "client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true, mangle: false, sourcemap: false, output: {
        comments: false
    }}),
    //new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'' + process.env.NODE_ENV + '\'',
      },
    })
  ],
};
