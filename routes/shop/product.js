var express = require('express');
var router = express.Router();
var productCtrl = require('../../controllers/productCtrl');

/* GET/:products */
router.get('/products', productCtrl.getAllProducts);

/* GET/:product */
router.get('/products/:slug', productCtrl.getProduct);

/* POST/:products */
router.post('/products', productCtrl.createProduct);

/* PUT/:product */
router.put('/products/:slug', productCtrl.updateProduct);

/* DELETE/:product */
router.delete('/products/:slug', productCtrl.deleteProduct);

module.exports = router;