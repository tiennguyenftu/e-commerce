var Order = require('../models/Order');

exports.getAllOrders = function (req, res, next) {
    Order.find({}, function (err, orders) {
        if (err) return next(err);
        res.json(orders);
    });
};

exports.createOrder = function (req, res, next) {
    var newOrder = new Order();
    newOrder.user_id = req.body.user_id;
    newOrder.name = req.body.name;
    newOrder.state = req.body.state;
    newOrder.line_items = req.body.line_items;
    newOrder.shipping_address = req.body.shipping_address;

    var items = req.body.line_items;
    newOrder.sub_total = 0;
    for (var i = 0; i < items.length; i++) {
        newOrder.sub_total += items[i].quantity * items[i].pricing.sale;
    }

    newOrder.save(function (err) {
        if (err) return next(err);
        res.json(newOrder);
    })

};