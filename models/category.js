var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    slug: {type: String, unique: true},
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    parent_id: {type: Schema.Types.ObjectId, ref: 'Category'},
    ancestors: [
        {
            name: String,
            _id: {type: Schema.Types.ObjectId, ref: 'Category'},
            slug: String
        }
    ]
});

module.exports = mongoose.model('Category', categorySchema);