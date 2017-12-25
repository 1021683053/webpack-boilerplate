const argv = require('yargs').argv;
const conf = require('./config');
process.env.NODE_ENV = argv.NODE_ENV === 'production'? 'production' : 'dev';

let run = function (){

    // 导出可用对象
    let app = this.app;

    // 监听端口启动服务
    app.listen(conf.port, conf.host, (err)=>{
        if(err){ throw err};
        console.log(`Server run at: http://${conf.host}:${conf.port}`);
    });

    // 返回原有app对象
    return app;
};

module.exports= (app, middleware, options)=>{

    // 服务配置
    let settings = options || {};
    Object.keys(settings).forEach((key)=>{
        app[key] = settings[key];
    });
    app.env = process.env.NODE_ENV;

    // 启动所有的中间件
    middleware(app);

    // 返回启动项
    return {
        app: app,
        run: run
    }
}