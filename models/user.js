const mongoose = require('mongoose');
const { strict } = require('assert');
const shortid = require('shortid');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    // _id: {
    //     type: String,
    //     default: shortid.generate
    // },
    firstName: {
        type : String,
        required  : true
    },
    lastName: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required  : true
    },
    phone: {
        type : String,
        required : true
    },
    address: {
        type : String,
        required : true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;