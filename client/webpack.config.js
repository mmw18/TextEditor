const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    // Mode set to dev. to enable dev-specific features
    mode: 'development',
    entry: {
      // Main point of entry for app
      main: './src/js/index.js',
      // Entry point for install-related logic
      install: './src/js/install.js'
    },
    output: {
      // Output bundles to be named after theur entry points
      filename: '[name].bundle.js',
      // Output directory for all assets
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './dist/index.html',
        filename: 'index.html', // name of output file in dist/
      }),      
      // new InjectManifest({
      //   // Source file for our service worker
      //   swSrc: './src-sw.js',
      //   // SW file that is generated in output directory
      //   swDest: 'service-worker.js', 
      // }),
      new WebpackPwaManifest({
        // To not add unique fingerprints to the filenames
        fingerprints: false,
        // Automatically inject manifest into html
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Create and save notes!',
        background_color: '#F8C8DC',
        theme_color: '#FFFFFF',
        // Start URL when app is opened
        start_url: './',
        // Public URL path of output directory
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            // Multiple sizes for different devices.
            sizes: [96, 128, 192, 256, 384, 512], 
            // Where icons will be placed in the output directory
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
