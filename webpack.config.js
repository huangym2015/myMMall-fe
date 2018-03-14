/*
* @Author: Ian
* @Date:   2018-02-25 09:46:43
* @Last Modified by:   Ian
* @Last Modified time: 2018-03-13 23:45:37
*/

var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin'); //单独打包css文件的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置,dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin的参数的方法
var getHtmlConfig = function(name,title){
    return{
        template: './src/view/'+name+'.html',
        filename: 'view/'+name+'.html',
        title : title,
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
        'user-login' : ['./src/page/user-login/index.js'],
        'user-register' : ['./src/page/user-register/index.js'],       
        'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],  
        'user-pass-update' : ['./src/page/user-pass-update/index.js'],  
        'user-center' : ['./src/page/user-center/index.js'],
        'user-center-update' : ['./src/page/user-center-update/index.js'],
        'result' : ['./src/page/result/index.js']
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
            //webpack自带的loader
            //{ test : /\.css$/,loader : "style-loader!css-loader" },
            //单独打包Css的插件EX 1.x的用法
            { test : /\.css$/,loader : Ex.extract("style-loader","css-loader") },
            //1.x以上的用法
            //{ test : /\.css$/,loader : Ex.extract({fallback: 'style-loader', use: ['css-loader']}) },          
            { test : /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader : 'url-loader?limit=100&name=/resource/[name].[ext]' },
            { test : /\.string$/,loader : 'html-loader'},
        ]
    },
    //路径
    resolve : {
        alias : {
            node_modules : __dirname + '/node_modules',
            util : __dirname + '/src/util',
            page : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image : __dirname + '/src/image',
        }
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
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    ]
};

//根据打包方式，是否调用webpack-dev-server
if('dev' == WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;


