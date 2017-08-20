var argv = require('yargs').argv;
process.env.NODE_ENV = argv.NODE_ENV === 'production'? 'production' : 'dev';

var express = require('express');
var path = require('path');
var app = express();
var config = require('./config');

app.engine('art', require('express-art-template'));
app.set('views', __dirname+'/views');
app.set('view engine', 'art');

app.set('view options', {
    debug: true,
    root: __dirname+'/views',
    extname: '.art'
});

// 环境变量
var env = process.env.NODE_ENV === 'production' ? 'build' : 'dev';

// 配置 DEV webpack
if( env === 'dev' ){
    require('./app/webpack-middleware')(app);
}

var staticPath = path.posix.join(config[env].assetsPublicPath, config[env].assetsSubDirectory);
app.use(staticPath, express.static('./static/dist'));

app.use(require('./app/mix')(staticPath));

app.get('/', function (req, res){
    var mix = res.mix;
    res.render('index', {mix: mix});
});

app.listen(3000);