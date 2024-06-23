const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      default: [],
      required: true,
    },
    BillAvailable: {
      type: Boolean,
      default: false,
      required: true,
    },
    WarrantyAvailable: {
      type: Boolean,
      default: false,
      required: true,
    },
    AccessoriesAvailable: {
      type: Boolean,
      default: false,
      required: true,
    },
    BoxAvailable: {
      type: Boolean,
      default: false,
      required: true,
    },
    ShowBidsOnProductPage: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", productSchema);
