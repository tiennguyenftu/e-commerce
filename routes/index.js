var express = require('express');
var router = express.Router();
var Product = require('../models/Product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({}, 'name images pricing slug')
      .sort({date: -1})
      .limit(12)
      .exec(function (err, products) {
        if (err) return next(err);
        if (!products) return next();
        var productChunks = [];
        var chunkSize = 4;
        for (var i = 0; i < products.length; i += chunkSize) {
          productChunks.push(products.slice(i, i + chunkSize));
        }
        res.render('main/index', {products: productChunks});
      });

});

module.exports = router;

