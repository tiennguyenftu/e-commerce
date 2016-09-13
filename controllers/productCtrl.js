var Product = require('../models/product');

exports.getAllProducts = function (req, res, next) {
    Product.find({}, function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
};

exports.getProduct = function (req, res, next) {
    Product.find({slug: req.params.slug}, function (err, product) {
        if (err) return next(err);
        res.json(product);
    });
};

exports.createProduct = function (req, res, next) {
    var newProduct = new Product();
    newProduct.name = req.body.name;
    newProduct.slug = req.body.name.toLowerCase().split(' ').join('-');
    newProduct.description = req.body.description;
    newProduct.sku = req.body.sku;
    newProduct.imageUrls = req.body.imageUrls;
    newProduct.pricing = req.body.pricing;
    newProduct.details = req.body.details;
    newProduct.primary_category = req.body.primary_category;
    newProduct.category_ids = req.body.category_ids;
    newProduct.tags = req.body.tags;

    newProduct.save(function (err) {
        if (err) return next(err);
        res.json(newProduct);
    });
};

exports.updateProduct = function (req, res, next) {
    Product.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true, upsert: true}, function (err, product) {
        if (err) return next(err);
        res.json(product);
    });
};

exports.deleteProduct = function (req, res, next) {
    Product.findOneAndRemove({slug: req.params.slug}, function (err) {
        if (err) return next(err);
        res.json({msg: 'Successfully delete product'});
    });
};


