var express = require('express');
var router = express.Router();
var userCtrl = require('../../controllers/userCtrl');
var passportConfig = require('../../config/passport');

/* GET/:users */
router.get('/users', userCtrl.getAllUsers);

/* GET/:user */
router.get('/profile', passportConfig.isAuthenticated, userCtrl.getUser);

/* POST/:user */
router.post('/users', userCtrl.createUser);

/* PUT/:user */
router.put('/users/:username', userCtrl.updateUser);

/* DELETE/:user */
router.delete('/users/:username', userCtrl.deleteUser);

module.exports = router;