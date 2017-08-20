var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpack = require('webpack');
var config = require('../config');

var webpackConfigDev = require('../build/webpack.dev.conf.js');

var compiler = webpack(webpackConfigDev);

var webpackDevMiddlewareInstance = webpackDevMiddleware(compiler,{
    publicPath: webpackConfigDev.output.publicPath,
    serverSideRender: true,
    quiet: true,
    stats: { colors: true }
});
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
});
var webpackHotMiddlewareInstance = webpackHotMiddleware(compiler);

module.exports = function(app){
    app.use(webpackDevMiddlewareInstance);
    app.use(webpackHotMiddlewareInstance);
};






