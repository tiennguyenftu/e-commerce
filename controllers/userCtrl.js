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
        res.render('main/authentication/user');
    });
};

exports.createUser = function (req, res, next) {
   if (req.body.password !== req.body.confirmPassword) {
       req.flash('errors', 'Password did not match');
       return res.redirect('/register');
   }

   User.find({$or: [{username: req.body.username}, {email: req.body.email}]}, function (err, existingUsers) {
       if (err) return next(err);
       if (existingUsers.length > 0) {
           req.flash('errors', 'Username or Email already taken');
           return res.redirect('/register');
       }

       var newUser = new User();
       newUser.username = req.body.username;
       newUser.email = req.body.email;
       newUser.password = req.body.password;

       newUser.save(function (err) {
           if (err) return next(err);
           res.redirect('/products');
       });
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