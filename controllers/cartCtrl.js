var Cart = require('../models/Cart');
var _ = require('underscore');


exports.getCart = function (req, res, next) {
    Cart.findOne({owner: req.user._id}, function (err, cart) {
        if (err) return next(err);
        console.log(cart);
        res.render('main/shop/cart/cart', {cart: cart});
    });
};

exports.addToCart = function (req, res, next) {
    if (req.user) {
        Cart.findOne({owner: req.user._id}, function (err, cart) {
            if (err) return next(err);
            var existingItem = _.find(cart.items, function (item) {
                return item._id === req.body._id;
            });

            if (existingItem) {
                var quantity = parseInt(existingItem.quantity);
                quantity += parseInt(req.body.quantity);
                existingItem.quantity = '' + quantity;
            } else {
                cart.items.push(req.body);
            }

            cart.totalQuantity = 0;
            cart.totalPrice = 0;

            for (var i = 0; i < cart.items.length; i++) {
                cart.totalQuantity += parseInt(cart.items[i].quantity);
                cart.totalPrice += (parseFloat(cart.items[i].sale) * parseInt(cart.items[i].quantity)).toFixed(2);
            }

            cart.save(function (err) {
                if (err) return next(err);
                res.redirect('/products/' + req.body.slug);
            });

        });
    }
};