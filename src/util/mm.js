/*
* @Author: ian
* @Date:   2018-02-27 10:56:24
* @Last Modified by:   Ian
* @Last Modified time: 2018-03-14 19:06:59
*/

'use strict';

var Hogan = require('hogan.js');
var conf = {
    serverHost : '' ,
}

//网络请求
var _mm={
    request : function(param){
        var _this = this;
        $.ajax({
            type     : param.method ||'get',
            url      : param.url    ||'',
            dataType : param.type   ||'json',
            data     : param.data   ||'',
            success  : function(res){
                if (0==res.status) {
                    //请求成功
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                
                }else if(10==res.status){
                    //没有登录状态,强制登录
                    _this.doLogin();

                }else if(1==res.status){
                    //请求数据出错
                    typeof param.error === 'function' && param.error(res.msg);

                }
            },
            error    : function(err){
                typeof param.error === 'function' && param.error(err.statusText);

            }
        });
    },

    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url的参数
    getUrlParam: function(name){
        //happymmall.com/product/list.do?keyword=XXX&page=1
        var reg = new RegExp('()' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板
    renderHtml : function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate), //编译
            result = template.render(data);  //输出
        return result;
    },
    //成功提示
    successTips : function(msg){
        alert(msg||'操作成功');
    },
    //错误提示
    errorTips : function(msg){
        alert(msg||'哪里不对了~');
    },
    //字段的验证，支持是非空、手机、邮箱的判断
    validate : function(value,type){
        var value = $.trim(value);
        //非空验证
        if('require' === type){
            return !!value;
        }
        //手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        //邮箱的验证
        if ('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },

    //统一登录处理
    doLogin : function(){
        window.location.href = './user-login.html?redirect='+encodeURIComponent(window.location.href); //防止特殊字符需要进行编码，安全
    },
    goHome : function(){
        window.location.href = './index.html';

    },

};

module.exports = _mm; //模块化输出