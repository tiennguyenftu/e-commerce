var Category = require('../models/Category');
var Product = require('../models/Product');

exports.getAllCategories = function (req, res, next) {
    Category.find({}, 'name', function (err, categories) {
        if (err) return next(err);
        res.locals.allCategories = categories;
        next();
    });
};

exports.getMainCategories = function (req, res, next) {
    Category.find({parent: null}, 'name image slug', function (err, categories) {
        if (err) return next(err);
        res.locals.categories = categories;
        next();
    });
};

//Get Sub Categories

exports.getBras = function (req, res, next) {
    Category.find({ancestors: 'Bras & Bralettes'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.bras = categories;
        next();
    });
};

exports.getPanties = function (req, res, next) {
    Category.find({ancestors: 'Panties'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.panties = categories;
        next();
    });
};

exports.getLingerie = function (req, res, next) {
    Category.find({ancestors: 'Lingerie'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.lingerie = categories;
        next();
    });
};

exports.getSleep = function (req, res, next) {
    Category.find({ancestors: 'Sleep'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.sleep = categories;
        next();
    });
};

exports.getBeauty = function (req, res, next) {
    Category.find({ancestors: 'Beauty'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.beauty = categories;
        next();
    });
};

exports.getSwim = function (req, res, next) {
    Category.find({ancestors: 'Swim'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.swim = categories;
        next();
    });
};

exports.getSport = function (req, res, next) {
    Category.find({ancestors: 'Sport'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.sport = categories;
        next();
    });
};

exports.getLounge = function (req, res, next) {
    Category.find({ancestors: 'Lounge'}, function (err, categories) {
        if (err) return next(err);
        res.locals.lounge = categories;
        next();
    });
};

exports.relatedProducts = function (req, res, next) {
    Product.findOne({slug: req.params.slug}, '_id categories', function (err, product) {
        if (err) return next(err);
        if (!product) return next();

        Product.find({'$and': [{categories: {'$in': product.categories}}, {_id: {'$ne': product._id}}]}, 'name images pricing slug')
            .sort({date: -1})
            .exec(function (err, products) {
                if (err) return next(err);
                if (!products) return next();
                var productChunks = [];
                var chunkSize = 4;

                for (var i = 0; i < products.length; i += chunkSize) {
                    productChunks.push(products.slice(i, i + chunkSize));
                }
                res.locals.products = productChunks;

                next();
            });
    });
};