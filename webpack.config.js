const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('./build/parcelLab.min.css')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './build/parcelLab.min.js',
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.scss'],
    modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(xml|html|txt|md)$/,
        loader: 'raw',
      },
      {
        test: /\.scss$/,
        loader: extractCSS.extract(['css', 'sass']),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [extractCSS],
}
