var Product = require('../models/Product');
var moment = require('moment');

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
    Product.findOne({slug: req.params.slug}, function (err, product) {
        if (err) return next(err);
        res.render('main/shop/products/get-one', {product: product});
    });
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
    product.slug = req.body.name.toLowerCase().split(' ').join('-');
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