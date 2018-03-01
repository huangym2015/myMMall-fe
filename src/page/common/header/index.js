/*
* @Author: Ian
* @Date:   2018-02-27 22:33:05
* @Last Modified by:   Ian
* @Last Modified time: 2018-02-28 14:30:48
*/
'use strict';
require('./index.css');

var _mm = require('util/mm.js');

//通用页面的头部
var header = {
    init : function(){
        this.bindEvent();
        return this;
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        if (keyword) {
            //keyword存在，回填输入框
            $('#search-input').val(keyword);
        }
    },
    bindEvent :function(){
        var _this = this;
        $('#search-btn').click(function(){
            //点击搜索按钮以后，做提交
            _this.searchSubmit();
        });
        //输入回车后，做搜索提交
        $('#search-input').keyup(function(){
            //13是回车键的keyCode
            if (e.keyCode == 13) {
                _this.searchSubmit();
            }
        });
    },

    //搜索的提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        //如果提交的时候有keyword,正常的跳转到list页
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            //如果keyword为空,直接返回首页
            _mm.goHome();
        }
    }
};
header.init();