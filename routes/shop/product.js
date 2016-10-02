var express = require('express');
var router = express.Router();
var productCtrl = require('../../controllers/productCtrl');
var passportConfig = require('../../config/passport');
var shopMiddleware = require('../../middleware/shop');

var multer  = require('multer');
var moment = require('moment');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/products/');
    },
    filename: function (req, file, cb) {
        cb(null, moment().format("MMM-Do-YY-h-mm-") + file.originalname);
    }
});
var upload = multer({ storage: storage });

/* GET/:products */
router.get('/products', productCtrl.getAllProducts);

/* GET/product/add*/
router.get('/products/add', passportConfig.isAdmin, shopMiddleware.getAllCategories, productCtrl.addProduct);

/* GET/:product */
router.get('/products/:slug', productCtrl.getProduct);

/* GET/:product/edit */
router.get('/products/:slug/edit', passportConfig.isAdmin, shopMiddleware.getAllCategories, productCtrl.editProduct);


/* POST/:products */
router.post('/products', upload.array('images', 12), productCtrl.createProduct);

/* PUT/:product */
router.post('/products/:slug/edit', passportConfig.isAdmin, upload.array('images', 12), productCtrl.updateProduct);

/* DELETE/:product */
router.delete('/products/:slug', passportConfig.isAdmin, productCtrl.deleteProduct);

module.exports = router;