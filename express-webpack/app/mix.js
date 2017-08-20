var production = process.env.NODE_ENV === 'production'
module.exports = function(static){
    var StatsJSON = require('../build/stats.json');

    return function(req, res, next){
        var stats;
        if( production ){
            stats = StatsJSON;
        }else{
            stats = res.locals.webpackStats.toJson();
        }

        console.log(stats);

        res.mix = function(){
            var ret = {};

            var chunkAll = stats.assetsByChunkName;
            ret.publicPath = static||stats.publicPath;
            ret.style = [];
            ret.script = [];

            chunk = indexAssets(chunkAll, 'manifest');
            if( chunk ){
                ret.style = ret.style.concat(chunk.styles);
                ret.script = ret.script.concat(chunk.scripts);
            }

            var chunk = indexAssets(chunkAll, 'vendor');
            if( chunk ){
                ret.style = ret.style.concat(chunk.styles);
                ret.script = ret.script.concat(chunk.scripts);
            }


            ret.string = function(){
                var style = this.style.map(function(uri){
                    return '<link rel="stylesheet" href="'+ret.publicPath+uri+'" />';
                });
                var script = this.script.map(function(uri){
                    return '<script src="'+ret.publicPath+uri+'"></script>';
                });
                this.style = style;
                this.script = script;
                return this;
            };

            ret.chunk = function (index) {
                if( index ){
                    chunk = indexAssets(chunkAll, index);
                    console.log(chunk);
                    if( chunk ) {
                        this.style = this.style.concat(chunk.styles);
                        this.script = this.script.concat(chunk.scripts);
                    }
                }
                return this;
            };
            console.log(ret);
            return ret;
        };
        next();
    };
};

function normalizeAssets(assets) {
    return Array.isArray(assets) ? assets : [assets]
};

function indexAssets(assetsAll, index){
    if( !assetsAll[index] ){
        return false;
    };
    let assets = normalizeAssets(assetsAll[index]);
    let chunks ={};
    chunks.scripts = assets.filter(path=>{
        return path.endsWith('.js')
    });
    chunks.styles = assets.filter(path=>{
        return path.endsWith('.css')
    });
    return chunks;
};

