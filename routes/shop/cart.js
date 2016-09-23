var express = require('express');
var router = express.Router();
var cartCtrl = require('../../controllers/cartCtrl');
var passportConfig = require('../../config/passport');

/* GET/:orders */
router.get('/cart', passportConfig.isAuthenticated, cartCtrl.getCart);

/* POST/:orders */
router.post('/cart', cartCtrl.addToCart);

module.exports = router;