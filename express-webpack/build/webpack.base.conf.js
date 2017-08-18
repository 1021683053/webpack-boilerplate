var path = require('path')
var utils = require('./utils')
var config = require('../config')
var glob = require('glob');

// Plugins
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var entrys = {};
glob.sync(resolve('static/src/enters/*.js')).forEach(file=>{
    entrys[path.basename(file, '.js')] = file;
});




module.exports = {
    entry: entrys,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath :
            config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('static/src')
        }
    },
    module: {
        rules:[
        {
            test: /\.less$/,
            use: ['style-loader?sourceMap=true', 'css-loader?sourceMap=true', 'postcss-loader?sourceMap=true', 'less-loader?sourceMap=true']
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('static/src')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    }
}