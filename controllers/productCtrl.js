var Product = require('../models/Product');
var Review = require('../models/Review');
var moment = require('moment');
var async = require('async');

exports.getAllProducts = function (req, res, next) {
    var perPage = 12;
    var page = req.query.p || 1;

    Product
        .find()
        .sort({date: -1})
        .skip( perPage * (page - 1))
        .limit( perPage )
        .exec(function(err, products) {
            if (err) return next(err);
            Product.count().exec(function(err, count) {
                if (err) return next(err);
                res.render('main/shop/products/get-all', {
                    products: products,
                    pagination: {
                        pageCount: Math.ceil(count / perPage),
                        page: page
                    }
                });
            });
        });
};

exports.addProduct = function (req, res, next) {
    res.render('main/shop/products/add');
};

exports.getProduct = function (req, res, next) {
    async.waterfall([
        function (callback) {
            Product.findOne({slug: req.params.slug}, function (err, product) {
                if (err) return next(err);
                if (!product) return res.redirect('/products');
                callback(null, product);
            });
        },

        function (product) {
            Review.find({product_id: product._id}).sort({date: 1}).exec(function (err, reviews) {
                if (err) return next(err);
                if (reviews.length > 0) {
                    var sum = 0;

                    var stars = {
                        one: {stars: 0, percentage: 0},
                        two: {stars: 0, percentage: 0},
                        three: {stars: 0, percentage: 0},
                        four: {stars: 0, percentage: 0},
                        five: {stars: 0, percentage: 0}
                    };

                    for (var i = 0; i < reviews.length; i++) {
                        sum += reviews[i].rating;

                        switch (reviews[i].rating) {
                            case 1:
                                stars.one.stars++;
                                break;
                            case 2:
                                stars.two.stars++;
                                break;
                            case 3:
                                stars.three.stars++;
                                break;
                            case 4:
                                stars.four.stars++;
                                break;
                            case 5:
                                stars.five.stars++;
                                break;
                        }
                    }
                    var averageRating = (sum/reviews.length).toFixed(1);
                    stars.one.percentage = (stars.one.stars / reviews.length).toFixed(2) * 100;
                    stars.two.percentage = (stars.two.stars / reviews.length).toFixed(2) * 100;
                    stars.three.percentage = (stars.three.stars / reviews.length).toFixed(2) * 100;
                    stars.four.percentage = (stars.four.stars / reviews.length).toFixed(2) * 100;
                    stars.five.percentage = (stars.five.stars / reviews.length).toFixed(2) * 100;

                    console.log(stars);

                    return res.render('main/shop/products/get-one', {product: product, reviews: reviews, stars: stars, averageRating: averageRating});
                }

                res.render('main/shop/products/get-one', {product: product, reviews: reviews});
            });
        }
    ]);
};

exports.editProduct = function (req, res, next) {
    Product.findOne({slug: req.params.slug}, function (err, product) {
        if (err) return next(err);
        if (!product) return res.redirect('/products');
        res.render('main/shop/products/edit', {product: product});
    });
};

exports.createProduct = function (req, res, next) {
    var newProduct = new Product();
    upsert(req, res, next, newProduct);
};

exports.updateProduct = function (req, res, next) {
    Product.findOne({slug: req.params.slug}, function (err, product) {
        if (err) return next(err);
        upsert(req, res, next, product);
    });
};

exports.deleteProduct = function (req, res, next) {
    Product.findOneAndRemove({slug: req.params.slug}, function (err) {
        if (err) return next(err);
        res.json({msg: 'Successfully delete product'});
    });
};


//HELPERS
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function upsert(req, res, next, product) {
    product.name = toTitleCase(req.body.name);
    product.sku = req.body.sku.toUpperCase();
    product.description = req.body.description;
    product.slug = req.body.name.toLowerCase().trim().split(' ').join('-');
    if (req.files) {
        product.images = [];
        for (var i = 0; i < req.files.length; i++) {
            product.images.push('/uploads/products/' + req.files[i].filename)
        }
    }

    if (req.body.colors) {
        product.details.colors = req.body.colors.toLowerCase().split(',');
    }

    product.pricing.retail = req.body.retail;
    product.pricing.sale = req.body.sale;
    product.categories = req.body.categories;

    if (req.body.tags) {
        product.tags = req.body.tags.toLowerCase().split(',');
    }

    product.date = moment().format('MMMM Do YYYY, h:mm a');

    product.save(function (err) {
        if (err) return next(err);
        res.redirect('/products');
    });
}