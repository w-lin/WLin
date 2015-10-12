var express = require('express');
var product = express.Router();
var path = require('path');

product.get('/product', function(req, res, next) {
    console.log('product route');
    res.sendFile(path.resolve('public/index.html'));
});

module.exports = product;