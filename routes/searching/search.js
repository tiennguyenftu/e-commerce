var express = require('express');
var router = express.Router();
var Product = require('../../models/Product');
var searchCtrl = require('../../controllers/searchCtrl');

/* POST/search */
router.post('/search', searchCtrl.postSearch);

/* GET/search */
router.get('/search', searchCtrl.getSearchResult);

module.exports = router;