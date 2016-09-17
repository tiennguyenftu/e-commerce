var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    slug: {type: String, unique: true},
    sku: {type: String, unique: true, required: true},
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    details: {
        sizes: {type: [String], default: ['XS', 'S', 'M', 'L', 'XL']},
        colors: [String]
    },
    images: [String],
    total_reviews: Number,
    average_reviews: Number,
    pricing: {
        retail: Number,
        sale: Number
    },
    categories: [String],
    tags: [String]
});

module.exports = mongoose.model('Product', productSchema);