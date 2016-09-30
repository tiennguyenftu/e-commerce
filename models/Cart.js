var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');

var cartSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    totalQuantity: {type: Number, default: 0},
    totalPrice: {type: Number, default: 0},
    items: [Schema.Types.Object]
});

cartSchema.methods.addOne = function (_id) {
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i]._id === _id) {

            this.items[i].quantity = '' + (parseInt(this.items[i].quantity) + 1);

            this.totalQuantity++;
            this.totalPrice = (this.totalPrice + parseFloat(this.items[i].sale)).toFixed(2);

            if (parseInt(this.items[i].quantity) <= 0) this.items = _.without(this.items, this.items[i]);
            return this;
        }
    }
    return this;
};

cartSchema.methods.reduceByOne = function (_id) {

    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i]._id === _id) {

            this.items[i].quantity = '' + (parseInt(this.items[i].quantity) - 1);

            this.totalQuantity--;
            this.totalPrice = (this.totalPrice - parseFloat(this.items[i].sale)).toFixed(2);

            if (parseInt(this.items[i].quantity) <= 0) this.items = _.without(this.items, this.items[i]);
            return this;
        }
    }
    return this;
};

cartSchema.methods.removeAll = function (_id) {
    var item = _.find(this.items, function (item) {
        return item._id === _id;
    });

    this.totalQuantity -= parseInt(item.quantity);
    this.totalPrice = (this.totalPrice - parseFloat(item.sale) * parseInt(item.quantity)).toFixed(2);

    this.items = _.without(this.items, item);

    return this;
};

module.exports = mongoose.model('Cart', cartSchema);