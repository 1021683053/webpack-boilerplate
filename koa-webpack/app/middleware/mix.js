const fs = require('fs');
module.exports = (static)=>{
    return async (ctx, next)=>{
        const exists = fs.existsSync('../../build/stats.json');
        const production = ctx.app.env;
        const dirname = ctx.app.dir;

        let stats;
        if( production == "production" ){
            stats = require('../../build/stats.json');
        }else if(production == "dev"){
            stats = ctx.state.webpackStats.toJson();
        }else{
            throw new Error('Not found production stats file.');
        }
        ctx.state.mix = {
            static: static||stats.publicPath,
            styles: [],
            scripts: [],
            chunks: function(index){
                var chunks = indexAssets(stats.entrypoints, index);
                this.styles = chunks.styles;
                this.scripts = chunks.scripts;
                return this;
            },
            string: function(type){
                var chunks = [];
                if( type == 'style' ){
                    chunks = this.styles;
                }else if( type == 'script' ){
                    chunks = this.scripts;
                }else{
                    return '';
                };
                return buildHTML(this.static, chunks, type);
            }
        };
        next();
    };
};

function normalizeAssets(assets) {
    return Array.isArray(assets) ? assets : [assets]
};

function indexAssets(assetsAll, index){
    if( !assetsAll[index] ){
        return {scripts:[], scripts: []};
    };
    var assets = normalizeAssets(assetsAll[index].assets);
    var chunks ={};
    chunks.scripts = assets.filter(path=>{
        return path.endsWith('.js')
    });
    chunks.styles = assets.filter(path=>{
        return path.endsWith('.css')
    });
    return chunks;
};

function buildHTML(static, chunks, type){
    if( !chunks || chunks.length<=0 ){
        return '';
    }
    let ret = '';
    chunks.forEach(function(chunk){
        if( type == 'script' ){
            ret+='<script src="'+ static + chunk +'" charset="utf-8"></script>';
            ret+='\n\t';
        }else if( type == 'style' ){
            ret+='<link rel="stylesheet" type="text/css" href="'+ static + chunk +'"/>';
            ret+='\n\t';
        }
    })
    return ret;
}