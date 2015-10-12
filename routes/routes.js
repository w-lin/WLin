var indexRoutes = require('./index');
var productRouters = require('./product');

module.exports = function(app) {
    console.log('in routers.js');
    app.use('/', indexRoutes);
    app.use('/product', productRouters);
}