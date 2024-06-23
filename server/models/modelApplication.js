// modelApplication.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    image: {
        type: String, // Assuming you're storing image URLs
       // required: true
    },
    fname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    nid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    interest: {
        type: String,
        required: true
    },
    work: {
        type: Number,
        required: true
    }
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;