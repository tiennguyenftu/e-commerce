var Product = require('../models/Product');

module.exports.getAllSales = function (req, res, next) {
   Product.find({$where: 'this.pricing.sale < this.pricing.retail'})
    .sort({date: -1})
        .exec(function (err, products) {
            if (err) return next(err);
            res.render('main/shop/sales/sales', {products: products});
        });
};

