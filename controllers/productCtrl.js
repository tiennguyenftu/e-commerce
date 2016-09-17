var Product = require('../models/Product');

exports.getAllProducts = function (req, res, next) {
    res.render('main/shop/products/get-all');
};

exports.addProduct = function (req, res, next) {
    res.render('main/shop/products/add');
};

exports.getProduct = function (req, res, next) {
    Product.findOne({slug: req.params.slug}, function (err, product) {
        if (err) return next(err);
        console.log(product);
        res.render('main/shop/products/get-one', {product: product, helpers: {
            equal: function(lvalue, rvalue, options) {
                if (arguments.length < 3)
                    throw new Error("Handlebars Helper equal needs 2 parameters");
                if( lvalue!=rvalue ) {
                    return options.inverse(this);
                } else {
                    return options.fn(this);
                }
            }
        }});
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

    product.save(function (err) {
        if (err) return next(err);
        res.redirect('/products');
    });
}

