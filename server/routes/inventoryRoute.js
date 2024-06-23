const Router = require("express").Router();
const InventoryItem = require("../models/inventoryModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add a new item to the inventory
Router.post("/add-items", authMiddleware, async (req, res) => {
  try {
    const newItem = new InventoryItem(req.body);
    await newItem.save();

    res.json({
      success: true,
      message: "Item added successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//get all items
Router.get("/get-items", authMiddleware, async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json({
      success: true,
      message: "Items fetched successfully",
      data: items,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});


//edit item
Router.put("/edit-item/:id", async (req, res) => {
  try {
    await InventoryItem.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      success: true,
      message: "Item updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//delete item
Router.delete("/delete-item/:id", authMiddleware, async (req, res) => {
  try {
    await InventoryItem.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = Router;

