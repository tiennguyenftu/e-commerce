var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    product_id: {type: Schema.Types.ObjectId, ref: 'Product'},
    date: String,
    title: String,
    text: String,
    rating: Number,
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    username: String,
    helpful_votes: Number,
    voter_id: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ]
});

module.exports = mongoose.model('Review', reviewSchema);