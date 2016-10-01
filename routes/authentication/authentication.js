var express = require('express');
var router = express.Router();
var authenticationCtrl = require('../../controllers/authenticationCtrl');

/* GET/register */
router.get('/register', authenticationCtrl.register);

/* GET/login */
router.get('/login', authenticationCtrl.getLogin);

/* POST/login */
router.post('/login', authenticationCtrl.postLogin);

/* GET/admin-login */
router.get('/admin-login', authenticationCtrl.getAdminLogin);

/* POST/admin-login */
router.post('/admin-login', authenticationCtrl.postAdminLogin);

/* GET/logout */
router.get('/logout', authenticationCtrl.logout);

module.exports = router;