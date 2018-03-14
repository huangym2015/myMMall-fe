/*
* @Author: Ian
* @Date:   2018-03-12 20:25:35
* @Last Modified by:   Ian
* @Last Modified time: 2018-03-12 22:02:21
*/

'use strict';
require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

//page 逻辑部分
var page = {
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        // 初始化左侧菜单
        navSide.init({
            name:'user-center',
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    loadUserInfo:function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
            
        });
    },
};
$(function(){
    page.init();
});