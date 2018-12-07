const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = class WebpackSettings {
    static generateOutput(options) {
        return {
            filename: options.filename,
            path: options.path
        }
    }

    static generateMainHTMLFile(options) {
        return new HtmlWebpackPlugin({
            title: options.title,
            minify: {
                collapseWhitespace: true
            },
            hash: true, // ensures users are not getting cached version
            template: options.templatePath,
        });
    }


    static processTS() {
        return {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }
    }
}