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
    Product.aggregate([
        {
            $sort: {
                date: -1
            }
        }
    ], function (err, products) {
        if (err) return next(err);
        res.locals.products = products;
        next();
    });
};