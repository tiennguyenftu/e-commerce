var Product = require('../models/Product');

module.exports.getAllSales = function (req, res, next) {
    var perPage = 12;
    var page = req.query.p || 1;

    Product
        .find({$where: 'this.pricing.sale < this.pricing.retail'})
        .sort({date: -1})
        .skip( perPage * (page - 1))
        .limit( perPage )
        .exec(function(err, products) {
            if (err) return next(err);
            console.log(products);
            if (products.length === 0) return res.redirect('/sales');
            Product.count().exec(function(err, count) {
                if (err) return next(err);
                res.render('main/shop/sales/sales', {
                    products: products,
                    pagination: {
                        pageCount: Math.ceil(count / perPage),
                        page: page
                    }
                });
            });
        });
};

