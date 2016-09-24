var Cart = require('../models/Cart');
var async = require('async');

exports.getCart = function (req, res, next) {
    Cart.findOne({owner: req.user._id}, function (err, cart) {
        if (err) return next(err);
        if (!cart) return res.redirect('/login');
        res.render('main/shop/cart/cart', {cart: cart, layout: 'authen-layout'});
    });
};

exports.addToCart = function (req, res, next) {
    async.waterfall([
        function (callback) {
            if (req.user) {
                Cart.findOne({owner: req.user._id}, function (err, cart) {
                    if (err) return next(err);

                    var existingItem = false;

                    for (var j = 0; j < cart.items.length; j++) {
                        if (cart.items[j]._id == req.body._id) {
                            existingItem = true;
                            cart.items[j].quantity = (parseInt(cart.items[j].quantity) + parseInt(req.body.quantity)) + '';
                        }
                    }

                    if (!existingItem) {
                        cart.items.push(req.body);
                    }

                    cart.totalQuantity = 0;
                    cart.totalPrice = 0;

                    for (var i = 0; i < cart.items.length; i++) {
                        cart.totalQuantity += parseInt(cart.items[i].quantity);
                        cart.totalPrice = (cart.totalPrice + parseFloat(cart.items[i].sale) * parseInt(cart.items[i].quantity)).toFixed(2);
                    }

                    callback(null, cart);
                });
            }
        },

        function (cart) {
            Cart.findOneAndUpdate({owner: req.user._id}, cart, {upsert: true}, function (err) {
                if (err) return next(err);
                res.redirect('/products/' + req.body.slug);
            });
        }
    ]);
};

exports.addOne = function (req, res, next) {
    Cart.findOne({owner: req.user._id}, function (err, cart) {
        if (err) return next(err);
        var editedCart = cart.addOne(req.params._id);
        Cart.findOneAndUpdate({owner: req.user._id}, editedCart, {upsert: true}, function (err) {
            if (err) return next(err);
            res.redirect('/cart');
        });
    });
};

exports.reduceByOne = function (req, res, next) {
    Cart.findOne({owner: req.user._id}, function (err, cart) {
        if (err) return next(err);
        var editedCart = cart.reduceByOne(req.params._id);
        Cart.findOneAndUpdate({owner: req.user._id}, editedCart, {upsert: true}, function (err) {
            if (err) return next(err);
            res.redirect('/cart');
        });
    });
};

exports.removeAll = function (req, res, next) {
    Cart.findOne({owner: req.user._id}, function (err, cart) {
        if (err) return next(err);
        var editedCart = cart.removeAll(req.params._id);
        Cart.findOneAndUpdate({owner: req.user._id}, editedCart, {upsert: true}, function (err) {
            if (err) return next(err);
            res.redirect('/cart');
        });
    });
};