var Category = require('../models/Category');

exports.getAllCategories = function (req, res, next) {
    Category.find({}, function (err, categories) {
        if (err) return next(err);
        res.render('main/shop/categories/get');
    });
};

exports.addCategory = function (req, res, next) {
    res.render('main/shop/categories/add')
};

exports.getCategory = function (req, res, next) {
    Category.findOne({slug: req.params.slug}, function (err, category) {
        if (err) return next(err);
        if (!category) return res.redirect('/categories');
        res.json(category);
    });
};

exports.editCategory = function (req, res, next) {
    Category.findOne({slug: req.params.slug}, function (err, category) {
        if (err) return next(err);
        if (!category) return res.redirect('/categories');
        res.render('main/shop/categories/edit', {category: category});
    });
};

exports.createCategory = function (req, res, next) {

    var newCategory = new Category();
    console.log(req.body);
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

//HELPERS
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function upsert(req, res, next, category) {
    category.name = toTitleCase(req.body.name);
    category.slug = req.body.name.toLowerCase().split(' ').join('-');
    if (req.file) {
        category.image = '/uploads/categories/' + req.file.filename;
    } else {
        category.image = null;
    }
    if (req.body.parent) {
        category.parent = req.body.parent;
        if (req.body.ancestors.length > 1) {
            category.ancestors = req.body.ancestors;
        } else if (req.body.ancestors.length === 1) {
            category.ancestors.push(req.body.ancestors);
        }
    } else {
        category.parent = null;
    }

    category.save(function (err) {
        if (err) return next(err);
        res.redirect('/categories');
    });

}