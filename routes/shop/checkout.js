var express = require('express');
var router = express.Router();
var checkoutCtrl = require('../../controllers/checkoutCtrl');
var passportConfig = require('../../config/passport');

var cartMiddleware = require('../../middleware/cart');

/* GET/checkout */
router.get('/checkout', passportConfig.isAuthenticated, checkoutCtrl.getCheckOut);

/* POST/checkout */
router.post('/checkout', passportConfig.isAuthenticated, cartMiddleware.getCart, checkoutCtrl.postCheckOut);

module.exports = router;