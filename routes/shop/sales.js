var express = require('express');
var router = express.Router();
var salesCtrl = require('../../controllers/saleCtrl');

/* GET/sales */
router.get('/sales', salesCtrl.getAllSales);

module.exports = router;