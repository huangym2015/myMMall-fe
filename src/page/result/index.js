/*
* @Author: Ian
* @Date:   2018-02-28 15:29:33
* @Last Modified by:   Ian
* @Last Modified time: 2018-02-28 16:47:13
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
    $element = $('.' + type + '-success');
    //显示对应的提示元素
    $element.show();
    
})