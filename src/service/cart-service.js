/*
* @Author: Ian
* @Date:   2018-03-03 16:18:46
* @Last Modified by:   Ian
* @Last Modified time: 2018-03-03 16:24:05
*/

'use strict';

var _mm = require('util/mm.js');

var _cart = {
    //获取购物车数据
    getCartCount:function(resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/cart/get_cart_product_count.do'),
            success:resolve,
            error: reject
        });
    },

}
module.exports = _cart;