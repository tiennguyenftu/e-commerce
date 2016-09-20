var Category = require('../models/Category');
var Product = require('../models/Product');

exports.getAllCategories = function (req, res, next) {
    Category.find({}, function (err, categories) {
        if (err) return next(err);
        res.locals.categories = categories;
        next();
    });
};

exports.getAllProducts = function (req, res, next) {
    Product.find({}, 'name images pricing slug').sort({date: -1}).exec(function (err, products) {
        if (err) return next(err);
        res.locals.products = products;
        next();
    });
};