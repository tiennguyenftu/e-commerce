var express = require('express');
var router = express.Router();
var cartCtrl = require('../../controllers/cartCtrl');
var passportConfig = require('../../config/passport');

/* GET/:orders */
router.get('/cart', passportConfig.isAuthenticated, cartCtrl.getCart);

/* POST/:orders */
router.post('/cart', cartCtrl.addToCart);

/* GET/add/:product_id */
router.get('/add/:_id', cartCtrl.addOne);

/* GET/reduce/:product_id */
router.get('/reduce/:_id', cartCtrl.reduceByOne);

/* GET/remove/:product_id */
router.get('/remove/:_id', cartCtrl.removeAll);


module.exports = router;