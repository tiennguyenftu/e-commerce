var express = require('express');
var router = express.Router();
var categoryCtrl = require('../../controllers/categoryCtrl');
var multer  = require('multer');
var moment = require('moment');
var passportConfig = require('../../config/passport');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/categories/');
    },
    filename: function (req, file, cb) {
        cb(null, moment().format("MMM-Do-YY-h-mm-") + file.originalname);
    }
});
var upload = multer({ storage: storage });

/* GET/categories */
router.get('/categories', categoryCtrl.getAllCategories);

/* GET/categories/add */
router.get('/categories/add', passportConfig.isAdmin, categoryCtrl.addCategory);

/* GET/:category */
router.get('/categories/:slug', categoryCtrl.getCategory);

/* GET/:category/edit */
router.get('/categories/:slug/edit', passportConfig.isAdmin, categoryCtrl.editCategory);



/* POST/:category */
router.post('/categories', passportConfig.isAdmin, upload.single('category-image'),categoryCtrl.createCategory);

/* PUT/:category */
router.post('/categories/:slug/edit', passportConfig.isAdmin, upload.single('category-image'), categoryCtrl.updateCategory);

/* DELETE/:category */
router.delete('/categories/:slug', passportConfig.isAdmin, categoryCtrl.deleteCategory);

module.exports = router;