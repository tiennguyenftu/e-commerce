var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    first_name: String,
    last_name: String,
    hashed_password: String,
    addresses: [
        {
            name: String,
            street: String,
            city: String,
            state: String,
            zip: Number
        }
    ],
    payment_methods: [
        {
            name: String,
            payment_token: String
        }
    ]
});

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);