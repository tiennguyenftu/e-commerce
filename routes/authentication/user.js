var express = require('express');
var router = express.Router();
var userCtrl = require('../../controllers/userCtrl');

/* GET/:users */
router.get('/users', userCtrl.getAllUsers);

/* GET/:user */
router.get('/users/:username', userCtrl.getUser);

/* POST/:user */
router.post('/users', userCtrl.createUser);

/* PUT/:user */
router.put('/users/:username', userCtrl.updateUser);

/* DELETE/:user */
router.delete('/users/:username', userCtrl.deleteUser);

module.exports = router;