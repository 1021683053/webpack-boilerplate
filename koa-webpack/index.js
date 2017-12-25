const Koa = require('koa');
const app = new Koa();
const server = require('./app/server');
const middleware = require('./app/middleware');

// 中间件
const route = require('koa-route');

const service = server(app, middleware, {
    dir: __dirname
});

// 路由
app.use(route.get('/', async (ctx)=>{
    ctx.render('home');
}));

app.use(route.get('/abc.png', async (ctx)=>{
    ctx.response.redirect('http://oubh8okt4.bkt.clouddn.com/100x100.png');
}));

app.on('error', (err, ctx)=>{
    ctx.body = JSON.stringify(err);
});

service.run(app);