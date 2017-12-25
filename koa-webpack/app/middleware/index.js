const path = require('path');

const middlewares = [
    // Loager配置
    (app)=>{
        const logger = require('koa-logger');
        app.use(logger());
    },

    // 启动 favicon
    // (app)=>{
    //     const dirname = app.dir;
    //     const favicon = require('koa-favicon');
    //     app.use(favicon( dirname+ '/favicon.ico'));
    // },

    // arttemplate 模板引擎
    (app)=>{
        const render = require('koa-art-template');
        const dirname = app.dir;
        render(app, {
            debug: true,
            root: path.join(dirname, '/views'),
            extname: '.art'
        });
    },

    // webpack 配置
    (app)=>{
        const dirname = app.dir;
        const mount = require('koa-mount');
        const serve = require('koa-static');
        const webpackConfig = require(dirname+ '/config');

        // 环境变量
        const env = app.env === 'production' ? 'build' : 'dev';
        const staticPath = path.posix.join(webpackConfig[env].assetsPublicPath, webpackConfig[env].assetsSubDirectory);
        
        // 配置 DEV webpack
        if( env === 'dev' ){
            require( dirname+ '/app/webpack-middleware')(app);
        }else{
            let static = serve(path.join(dirname, staticPath, '/dist') );
            app.use( mount('/static',  static) );
        }

        // 启动服务
        app.use(require(dirname+ '/app/middleware/mix')(staticPath));
    }
];

module.exports = (app)=>{
    middlewares.every((func)=>{
        func.call(this, app);
        return true;
    });
};

