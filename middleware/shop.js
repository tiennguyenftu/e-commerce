var Category = require('../models/Category');
var Product = require('../models/Product');

exports.getMainCategories = function (req, res, next) {
    Category.find({parent: null}, 'name image slug', function (err, categories) {
        if (err) return next(err);
        res.locals.categories = categories;
        next();
    });
};

//Get Sub Categories

exports.getBras = function (req, res, next) {
    Category.find({ancestors: 'Bras & Bralettes'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.bras = categories;
        next();
    });
};

exports.getPanties = function (req, res, next) {
    Category.find({ancestors: 'Panties'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.panties = categories;
        next();
    });
};

exports.getLingerie = function (req, res, next) {
    Category.find({ancestors: 'Lingerie'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.lingerie = categories;
        next();
    });
};

exports.getSleep = function (req, res, next) {
    Category.find({ancestors: 'Sleep'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.sleep = categories;
        next();
    });
};

exports.getBeauty = function (req, res, next) {
    Category.find({ancestors: 'Beauty'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.beauty = categories;
        next();
    });
};

exports.getSwim = function (req, res, next) {
    Category.find({ancestors: 'Swim'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.swim = categories;
        next();
    });
};

exports.getSport = function (req, res, next) {
    Category.find({ancestors: 'Sport'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.sport = categories;
        next();
    });
};

exports.getLounge = function (req, res, next) {
    Category.find({ancestors: 'Lounge'}, function (err, categories) {
        if (err) return next(err);
        if (!categories) return next();
        res.locals.lounge = categories;
        next();
    });
};