process.env.NODE_ENV = 'production';

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

// serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);
app.use(staticPath, express.static('./static/dist'));

app.use(require('./app/mix')(staticPath));

app.get('/', function (req, res){
    var mix = res.mix;
    res.render('index', {mix: mix});
});

app.listen(3000);