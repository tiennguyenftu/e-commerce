var Category = require('../models/category');

exports.getAllCategories = function (req, res, next) {
    Category.find({}, function (err, categories) {
        if (err) return next(err);
        res.render('main/shop/categories/get');
    });
};

exports.getCategory = function (req, res, next) {
    Category.find({slug: req.params.slug}, function (err, category) {
        if (err) return next(err);
        res.json(category);
    });
};

exports.editCategory = function (req, res, next) {
    Category.findOne({slug: req.params.slug}, function (err, category) {
        if (err) return next(err);
        res.render('main/shop/categories/edit', {category: category});
    });
};

exports.addCategory = function (req, res, next) {
    res.render('main/shop/categories/add')
};

exports.createCategory = function (req, res, next) {

    var newCategory = new Category();
    upsert(req, res, next, newCategory);
};


exports.updateCategory = function (req, res, next) {
    Category.findOne({slug: req.params.slug}, function (err, category) {
        if (err) return next(err);
        upsert(req, res, next, category);
    });
};

exports.deleteCategory = function (req, res, next) {
    Category.findOneAndRemove({slug: req.params.slug}, function (err) {
        if (err) return next(err);
        res.json({msg: 'Successfully delete category'});
    });
};


function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function upsert(req, res, next, category) {
    category.name = toTitleCase(req.body.name);
    category.slug = req.body.name.toLowerCase().split(' ').join('-');
    if (req.file) {
        category.image = '/uploads/categories/' + req.file.filename;
    } else {
        category.image = '/uploads/categories/default.jpg';
    }
    if (req.body["parent-category"]) {
        Category.find({name: req.body['parent-category']}, function (err, parentCategory) {
            if (err) return next(err);
            console.log('Parent: '+ parentCategory);
            category.parent_id = parentCategory._id;
            category.ancestors.push(parentCategory);
            category.save(function (err) {
                if (err) return next(err);
                res.json(category);
            });
        });
    } else {
        category.save(function (err) {
            if (err) return next(err);
            res.json(category);
        });
    }
}