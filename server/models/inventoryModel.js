const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    ItemName: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    DonorName: {
      type: String,
      required: true,
    },
    DonorContact: {
      type: String,
      required: true,
    },
    RecievedDate: {
      type: Date,
      default: Date.now,
    },
    Description: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("InventoryItems", InventorySchema);
