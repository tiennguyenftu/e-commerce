var express = require('express');
var router = express.Router();
var passportConfig = require('../../config/passport');
var orderMiddleware = require('../../middleware/order');

router.get('/dashboard', passportConfig.isAdmin, orderMiddleware.getAllOrders, function (req, res, next) {
    res.render('main/authentication/admin-dashboard', {orders: res.locals.orders, layout: 'authen-layout'});
});

module.exports = router;