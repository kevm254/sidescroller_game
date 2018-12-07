const WebpackSettings = require('./webpack.settings');
const path = require('path');


module.exports = {
  ////////////////////////////////////////
  // Entry
  ////////////////////////////////////////
  entry: './src/main.ts',


  ////////////////////////////////////////
  // Output
  ////////////////////////////////////////
  output: WebpackSettings.generateOutput(
    {
      bundleName: 'app.bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  ),


  ////////////////////////////////////////
  // Plugins
  ////////////////////////////////////////
  devServer: {
    contentBase: path.join(__dirname, 'dist'),  // tells the server where to serve content from
    compress: true,
    port: 3000
  },

  ////////////////////////////////////////
  // Plugins
  ////////////////////////////////////////
  plugins: [
    WebpackSettings.generateMainHTMLFile(
      { 
        title: 'Webpack template generator',
        templatePath: './src/index.ejs'
      }
    ),
  ],

  
  ////////////////////////////////////////
  // Modules
  ////////////////////////////////////////
  module: {
    rules: [
      WebpackSettings.processTS(),
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },


}




