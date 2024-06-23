const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    idd : {
        type : String,
        required: true
    },

    name : {
        type : String,
        required: true
    },

    address : {
        type : String,
        required: true
    },

    nic : {
        type : String,
        required: true
    },

    requestType : {
        type : String,
        required : true
    },

    want : {
        type : String,
        require : true
    },

    request : {
        type : String,
        required: true
    },

    date : {
        type: Date,
        default: Date.now,
    }


})

const customer = mongoose.model("customer",customerSchema);

module.exports = customer;