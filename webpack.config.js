const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/webview/index.tsx', // Your React entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webview.js', // The bundled file
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        type: 'json',
      },
    ],
  },
};
