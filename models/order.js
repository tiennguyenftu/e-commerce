var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    state: String,
    line_items: [
        {
            _id: {type: Schema.Types.ObjectId, ref: 'Product'},
            sku: String,
            name: String,
            quantity: Number,
            pricing: {
                retail: Number,
                sale: Number
            }
        }
    ],
    shipping_address: {
        street: String,
        city: String,
        state: String,
        zip: Number
    },
    sub_total: Number
});

module.exports = mongoose.model('Order', orderSchema);