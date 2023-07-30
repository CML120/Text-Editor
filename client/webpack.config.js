// Import the HtmlWebpackPlugin, a plugin to generate HTML files.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');// Import the WebpackPwaManifest, a plugin to generate the web app manifest file.
const path = require('path'); // Import the 'path' module to work with file paths.
const { InjectManifest } = require('workbox-webpack-plugin');// Import the InjectManifest class from the 'workbox-webpack-plugin' to inject the service worker.

// Export the Webpack configuration as a function.
module.exports = () => {
  return {
    mode: 'development',  //set mode
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },
    // Specify the output settings for the bundled JavaScript files.
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate HTML files based on index.html template
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['main'],
        filename: 'index.html',
      }),

      // Inject the service worker into your app
      new InjectManifest({
        swSrc: './service-worker.js',
        swDest: 'service-worker.js',
      }),

      // Generate the web app manifest file
      new WebpackPwaManifest({
        fingerprints: false, //needs to be false so files aren't fingerprinted (renamed for caching purposes)
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A text editor app with PWA support',
        start_url: '/',
        publicPath: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    // Configure the module settings for handling CSS and JavaScript
    module: {
      rules: [
        // Add CSS loaders
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // Babel loader for handling ES6
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
  };
};
