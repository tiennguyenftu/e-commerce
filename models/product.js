var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    slug: {type: String, unique: true},
    sku: {type: String, unique: true, required: true},
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    details: {
        band_sizes: [Number],
        cup_sizes: [String],
        colors: [String]
    },
    imageUrls: [{type: String}],
    total_reviews: Number,
    average_reviews: Number,
    pricing: {
        retail: Number,
        sale: Number
    },
    price_history: [
        {
            retail: Number,
            sale: Number,
            start: String,
            end: String
        }
    ],
    primary_category: {type: Schema.Types.ObjectId, ref: 'Category'},
    category_ids: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    tags: [String]
});

module.exports = mongoose.model('Product', productSchema);