/*
* @Author: ian
* @Date:   2018-03-13 23:38:04
* @Last Modified by:   Ian
* @Last Modified time: 2018-03-14 18:59:37
*/

'use strict';
require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//page 逻辑部分
var page = {
    init:function(){
        this.onLoad();

        this.bindEvent();
    },
    onLoad:function(){
        // 初始化左侧菜单
        navSide.init({
            name:'user-pass-update',
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    bindEvent:function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                password:$.trim($('#password').val()),
                passwordNew:$.trim($('#password-new').val()),
                passwordConfirm:$.trim($('#password-confirm').val()),
                
            },
            validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                // 更改用户密码
                _user.updatePassword({
                    passwordOld:userInfo.password,
                    passwordNew:userInfo.passwordNew
                },function(res,msg){
                    _mm.successTips(msg);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    loadUserInfo:function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
            
        });
    },
    // 验证字段信息
    validateForm:function(formData){
         //表单字段的验证
        var result = {
            status:false,
            msg: '',
        };
             
        if (!_mm.validate(formData.password,'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length<6) {
            result.msg = '密码长度不得少于6位';
            return result;
        }
        if (formData.passwordNew!=formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
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