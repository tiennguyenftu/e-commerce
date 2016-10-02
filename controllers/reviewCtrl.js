var Review = require('../models/Review');
var moment = require('moment');
var async = require('async');

exports.postReview = function (req, res, next) {
    var newReview = new Review();
    newReview.product_id = req.body.productId;
    newReview.date = moment().format('MMM Do YYYY, h:mm a');
    newReview.comment = req.body.comment;
    newReview.rating = req.body.rating;
    newReview.user_id = req.user._id;
    newReview.username = req.user.username;

    newReview.save(function (err) {
        if (err) return next(err);
        res.redirect('/products/' + req.body.productSlug + '/#reviews');
    });
};