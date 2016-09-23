var Cart = require('../models/Cart');

exports.getCartLength = function (req, res, next) {
    if (req.user) {
        Cart.findOne({owner: req.user._id}, 'totalQuantity', function (err, cart) {
            if (err) return next(err);
            if (!cart) return next();
            res.locals.cartLength = cart.totalQuantity;
            next();
        })
    } else {
        next();
    }
};