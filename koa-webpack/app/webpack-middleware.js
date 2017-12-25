const webpack = require('webpack');
const koaWebpack = require('koa-webpack');
const config = require('../config');
const webpackConfigDev = require('../build/webpack.dev.conf.js');
const compiler = webpack(webpackConfigDev);
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
});

const middleware = koaWebpack({
    compiler: compiler,
    dev: {
        publicPath: webpackConfigDev.output.publicPath,
        serverSideRender: true,
        quiet: true,
        stats: { colors: true }
    }
});

module.exports = (app)=>{
    app.use(middleware);
};