var express = require('express');
var router = express.Router();
var categoryCtrl = require('../../controllers/categoryCtrl');

/* GET/:categories */
router.get('/categories', categoryCtrl.getAllCategories);

/* GET/:category */
router.get('/categories/:slug', categoryCtrl.getCategory);

/* POST/:category */
router.post('/categories', categoryCtrl.createCategory);

/* PUT/:category */
router.put('/categories/:slug', categoryCtrl.updateCategory);

/* DELETE/:category */
router.delete('/categories/:slug', categoryCtrl.deleteCategory);

module.exports = router;