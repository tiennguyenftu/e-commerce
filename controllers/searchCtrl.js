var Product = require('../models/Product');

exports.postSearch = function (req, res, next) {
    res.redirect('/search?q=' + req.body.q);
};

exports.getSearchResult = function (req, res, next) {
    if (req.query.q) {
        Product.find({$text: {$search: req.query.q, $language: 'en'}}, function (err, products) {
            if (err) return next(err);
            res.render('main/shop/searching/search', {products: products, q: req.query.q, count: products.length});
        });

    } else {
        res.redirect('/products');
    }
};