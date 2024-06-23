const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  headline: {
    type: String,
    required: true, //backend validation
  },

  image: {
    type: String,
    // required: true
  },

  date: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },
  description: {
    type: String, // Fix typo: change 'discription' to 'description'
    required: true,
  },
});

const event = mongoose.model("event", eventSchema);

module.exports = event;
