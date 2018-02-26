/*
* @Author: Ian
* @Date:   2018-02-25 09:46:43
* @Last Modified by:   Ian
* @Last Modified time: 2018-02-26 10:25:42
*/

var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin'); //单独打包css文件
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置,dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin的参数的方法
var getHtmlConfig = function(name){
    return{
        template: './src/view/'+name+'.html',
        filename: 'view/'+name+'.html',
        inject: true,
        hash: true,
        chunks : ['common',name],

    }
};

//webpack config
config ={
    entry:{
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js']
    },
    output:{
        path : './dist',  //存放文件路径
        publicPath: '/dist',   //访问文件路径
        filename : 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },

    module : {
        loaders : [
            //{ test : /\.css$/,loader : "style-loader!css-loader" },
            //1.x的用法
            { test : /\.css$/,loader : Ex.extract("style-loader","css-loader") },
            //1.x以上的用法
            //{ test : /\.css$/,loader : Ex.extract({fallback: 'style-loader', use: ['css-loader']}) },
           
            { test : /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader : 'url-loader?limit=100&name=resource/[name].[ext]' },

        ]
    },
    plugins : [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        //把css单独打包到文件
        new Ex("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};

//根据打包方式，是否调用webpack-dev-server
if('dev' == WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;


