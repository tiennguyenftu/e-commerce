var Category = require('../models/category');


exports.getAllCategories = function (req, res, next) {
    Category.find({}, function (err, categories) {
        if (err) return next(err);
        res.json(categories);
    });
};

exports.getCategory = function (req, res, next) {
    Category.find({slug: req.params.slug}, function (err, category) {
        if (err) return next(err);
        res.json(category);
    });
};

exports.createCategory = function (req, res, next) {
    var newCategory = new Category();
    newCategory.name = req.body.name;
    newCategory.slug = req.body.name.toLowerCase().split(' ').join('-');
    newCategory.description = req.body.description;
    if (req.body.parent_id) {
        newCategory.parent_id = req.body.parent_id;
    }

    if (req.body.ancestors) {
        newCategory.ancestors = req.body.ancestors;
    }

    newCategory.save(function (err) {
        if (err) return next(err);
        res.json(newCategory);
    });
};

exports.updateCategory = function (req, res, next) {
    Category.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true, upsert: true}, function (err, category) {
        if (err) return next(err);
        res.json(category);
    });
};

exports.deleteCategory = function (req, res, next) {
    Category.findOneAndRemove({slug: req.params.slug}, function (err) {
        if (err) return next(err);
        res.json({msg: 'Successfully delete category'});
    });
};