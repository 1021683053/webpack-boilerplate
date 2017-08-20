var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
};

exports.styleLoaders = function(options){
    var sourceMap = options.sourceMap ? '?sourceMap=true' : '';

    console.log(sourceMap);
    var extract = options.extract;
    var loaders = ['css-loader', 'postcss-loader', 'less-loader']
    var ret = {
        test: /\.less$/,
    }

    if( !extract ){
        loaders.unshift('style-loader');
    }

    loaders = loaders.map(function(loader){
        return loader+sourceMap;
    });

    if( extract ){
        ret.use =  ExtractTextPlugin.extract({
            fallback: 'style-loader'+sourceMap,
            use: loaders
        })
    }else{
        ret.use = loaders;
    };
    console.log(ret);
    return [ret];
};

