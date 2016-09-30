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


// var orderSchema = new Schema({
//     user_id: {type: Schema.Types.ObjectId, ref: 'User'},
//     state: String,
//     line_items: [
//         {
//             _id: {type: Schema.Types.ObjectId, ref: 'Product'},
//             sku: String,
//             name: String,
//             quantity: Number,
//             pricing: {
//                 retail: Number,
//                 sale: Number
//             }
//         }
//     ],
//     shipping_address: {
//         street: String,
//         city: String,
//         state: String,
//         zip: Number
//     },
//     sub_total: Number
// });