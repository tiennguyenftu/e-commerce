var stripeConfig = require('../config/stripe');
var stripe = require('stripe')(stripeConfig.secretKey);
var Order = require('../models/Order');
var Cart = require('../models/Cart');
var moment = require('moment');
var async = require('async');

exports.getCheckOut = function (req, res, next) {
    res.render('main/shop/checkout/checkout', {layout: 'checkout-layout'});
};

exports.postCheckOut = function (req, res, next) {
    stripe.charges.create({
        amount: Math.round(req.body.stripeMoney * 100),
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            console.log(err);
            return res.redirect('/checkout');
        }

        async.waterfall([
            function (callback) {
                var cart = res.locals.cart;

                var order = new Order();
                order.user_id = req.user._id;
                order.name = req.body.name;
                order.state = 'Processing';
                order.line_items = cart.items;
                order.shipping_address = {
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip
                };
                order.sub_total = res.locals.totalPrice;
                order.date = moment().format('MMM Do YYYY, h:mm a');


                order.save(function (err, order) {
                    if (err) return next(err);
                    callback(null, cart);
                });
            },

            function (cart) {
                cart.totalPrice = 0;
                cart.totalQuantity = 0;
                cart.items = [];

                Cart.findOneAndUpdate({owner: req.user._id}, cart, function (err, cart) {
                    if (err) return next(err);
                    res.redirect('/profile');
                });
            }
        ]);
    });
};