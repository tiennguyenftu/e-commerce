var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    totalQuantity: {type: Number, default: 0},
    totalPrice: {type: Number, default: 0},
    items: [Schema.Types.Object]
});

module.exports = mongoose.model('Cart', cartSchema);