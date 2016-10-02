var express = require('express');
var router = express.Router();
var reviewCtrl = require('../../controllers/reviewCtrl');
var passportConfig = require('../../config/passport');

/* POST/review */
router.post('/reviews', passportConfig.isAuthenticated, reviewCtrl.postReview);

module.exports = router;