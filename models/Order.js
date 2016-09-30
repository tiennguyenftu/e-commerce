var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    state: String,
    line_items: [
        Schema.Types.Object
    ],
    shipping_address: Schema.Types.Object,
    sub_total: Number,
    date: String
});

module.exports = mongoose.model('Order', orderSchema);