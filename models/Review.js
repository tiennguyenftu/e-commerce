var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    product_id: {type: Schema.Types.ObjectId, ref: 'Product'},
    date: String,
    comment: String,
    rating: Number,
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    username: String
});

module.exports = mongoose.model('Review', reviewSchema);