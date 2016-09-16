var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    slug: {type: String, unique: true},
    name: {type: String, required: true, unique: true},
    image: String,
    parent_id: {type: Schema.Types.ObjectId},
    ancestors: [Schema.Types.Object]
});

module.exports = mongoose.model('Category', categorySchema);