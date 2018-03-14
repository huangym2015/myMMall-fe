/*
* @Author: Ian
* @Date:   2018-02-25 09:48:14
* @Last Modified by:   Ian
* @Last Modified time: 2018-03-03 17:58:28
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

//表单里的错误提示
var formError = {
    show: function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide:function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

//page 逻辑部分
var page = {
    init:function(){
        this.bindEvent();
    },
    bindEvent:function(){
        var _this = this;
        //登录按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        //如果按钮回车,也提交
        $('.user-content').keyup(function(e){
            //keyCode=13表示回车键
            if (e.keyCode==13) {
                _this.submit();
            }
        });
    },
    //提交表单
    submit: function(){
        var formData = {
                username:$.trim($('#username').val()),
                password:$.trim($('#password').val())
            },
            //表单验证结果
            validateResult = this.formValidate(formData);
        if (validateResult.status) {
            //验证成功提交
            _user.login(formData,function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                formError.show(errMsg);
            });
        }else{
            //验证失败
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    //表单字段验证
    formValidate:function(formData){
        //表单字段的验证
        var result = {
            status:false,
            msg: '',
        };
        if (!_mm.validate(formData.username,'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
         if (!_mm.validate(formData.password,'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    },
};
$(function(){
    page.init();
});