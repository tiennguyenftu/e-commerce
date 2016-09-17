var User = require('../models/User');

exports.getAllUsers = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
};

exports.getUser = function (req, res, next) {
    User.find({username: req.params.username}, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
};

exports.createUser = function (req, res, next) {
    var newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.first_name = req.body.first_name;
    newUser.last_name = req.body.last_name;
    if (req.body.addresses) {
        newUser.addresses = req.body.addresses;
    }

    newUser.save(function (err) {
        if (err) return next(err);
        res.json(newUser);
    });
};


exports.updateUser = function (req, res, next) {
    User.findOneAndUpdate({username: req.params.username}, req.body, {new: true, upsert: true}, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
};

exports.deleteUser = function (req, res, next) {
    User.findOneAndRemove({username: req.params.username}, function (err) {
        if (err) return next(err);
        res.json({msg: 'Successfully delete user'});
    });
};