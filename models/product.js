var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    slug: {type: String, unique: true},
    sku: String,
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    details: {
        weight: Number,
        weight_units: String,
        model_num: Number,
        manufacturer: String,
        color: String
    },
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
    main_cat_id: {type: Schema.Types.ObjectId, ref: 'Category'},
    tags: [String]
});

module.exports = mongoose.model('Product', productSchema);