const router = require("express").Router();
const Bid = require("../models/bidModel");
const authMiddleware = require("../middlewares/authMiddleware");

//place a new bid
router.post("/place-new-bid", authMiddleware, async (req, res) => {
  try {
    const newBid = new Bid(req.body);
    await newBid.save();
    res.json({
      success: true,
      message: "Bid placed successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//get all bids
router.post("/get-all-bids", authMiddleware, async (req, res) => {
  try {
    const { product, seller, buyer } = req.body;
    let filters = {};
    if (product) {
      filters.product = product;
    }
    if (seller) {
      filters.seller = seller;
    }
    if (buyer) {
      filters.buyer = buyer;
    }
    const bids = await Bid.find(filters)
      .populate("product")
      .populate("seller")
      .populate("buyer")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bids,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
