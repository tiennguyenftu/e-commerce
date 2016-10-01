var Order = require('../models/Order');

exports.getAllOrders = function (req, res, next) {
    Order.find().sort({date: -1}).exec(function (err, orders) {
        if (err) return next(err);
        res.locals.orders = orders;
        next();
    });
};