var express = require('express');
var router = express.Router();
var orderCtrl = require('../../controllers/orderCtrl');

/* GET/:orders */
router.get('/orders', orderCtrl.getAllOrders);

/* POST/:orders */
router.post('/orders', orderCtrl.createOrder);

module.exports = router;