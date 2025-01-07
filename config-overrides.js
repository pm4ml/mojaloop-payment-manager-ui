// webpack.config.js
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Other configurations...
  module: {
    rules: [
      {
        test: /\.scss$/, // Match SCSS files
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader',   // Translates CSS into CommonJS
          {
            loader: 'sass-loader', // Compiles Sass to CSS
            options: {
              additionalData: `
                $primary-color: ${JSON.stringify(process.env.REACT_APP_PRIMARY_COLOR || '#e80002')};
                $secondary-color: ${JSON.stringify(process.env.REACT_APP_SECONDARY_COLOR || '#d1344e')};
                $accent-color: ${JSON.stringify(process.env.REACT_APP_ACCENT_COLOR || '#39cff7')};
                $shadow-color: ${JSON.stringify(process.env.REACT_APP_SHADOW_COLOR || '#6faedd')};
              `,
            },
          },
        ],
      },
      {
        test: /\.svg$/, // Match SVG files
        loader: 'svg-sprite-loader', // Use SVG sprite loader
      },
    ],
  },
  plugins: [
    new Dotenv({ 
      path: './.env', // Load environment variables from .env file
    }),
  ],
};
