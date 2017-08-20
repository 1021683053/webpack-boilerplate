var express = require('express');
var path = require('path');
var app = express();
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require("webpack-hot-middleware")
var webpack = require('webpack');
var config = require('./config');

var webpackConfigDev = require('./build/webpack.dev.conf.js');

var compiler = webpack(webpackConfigDev);

app.engine('art', require('express-art-template'));
app.set('views', __dirname+'/views');
app.set('view engine', 'art');

var webpackDevMiddlewareInstance = webpackDevMiddleware(compiler,{
    publicPath: webpackConfigDev.output.publicPath,
    serverSideRender: true,
    quiet: true,
    stats: { colors: true }
});

var webpackHotMiddlewareInstance = webpackHotMiddleware(compiler);

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
});

app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddlewareInstance);

app.set('view options', {
    debug: true,
    root: __dirname+'/views',
    extname: '.art'
});

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static/dist'));

app.use(require('./app/mix')(staticPath));

app.get('/', function (req, res){
    var assets = res.mix().chunk('index').string();
    console.log(assets);
    res.render('index', {chunk: assets});
});

app.listen(3000);