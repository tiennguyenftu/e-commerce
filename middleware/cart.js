var Cart = require('../models/Cart');

exports.getCartLength = function (req, res, next) {
    if (req.user) {
        Cart.findOne({owner: req.user._id}, 'totalQuantity totalPrice', function (err, cart) {
            if (err) return next(err);
            if (!cart) return next();
            res.locals.totalQuantity = cart.totalQuantity;
            res.locals.totalPrice = cart.totalPrice;
            next();
        })
    } else {
        next();
    }
};

exports.getCart = function (req, res, next) {
    if (req.user) {
        Cart.findOne({owner: req.user._id}, function (err, cart) {
            if (err) return next(err);
            if (!cart) return next();
            res.locals.cart = cart;
            next();
        });
    }
};