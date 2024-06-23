const Router = require("express").Router();
const product = require("../models/productModel");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const User = require("../models/userModel");
const Notification = require("../models/notificationsModel");

// add a new product
Router.post("/add-product", authMiddleware, async (req, res) => {
  try {
    const newProduct = new product(req.body);
    await newProduct.save();

    //send notification to admin
    const admin = await User.find({ role: "admin" });
    admin.forEach(async (admin) => {
      const newNotification = new Notification({
        user: admin._id,
        message: `new product added by ${req.user.name}`,
        title: "New product",
        onclick: `/admin`,
        read: false,
      });
      await newNotification.save();
    });

    res.json({
      success: true,
      message: "product added successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//get all products
Router.post("/get-products", async (req, res) => {
  try {
    const { seller, category = [], age = [], status } = req.body;

    let filters = {};
    if (seller) {
      filters.seller = seller;
    }

    if (status) {
      filters.status = status;
    }

    //filter by category

    if (category.length > 0) {
      filters.category = { $in: category };
    }

    //filter by age

    if (age.length > 0) {
      age.forEach((item) => {
        const fromAge = item.split("-")[0];
        const toAge = item.split("-")[1];
        filters.age = { $gte: fromAge, $lte: toAge };
      });
    }

    const products = await product
      .find(filters)
      .populate("seller")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//edit product
Router.put("/edit-product/:id", async (req, res) => {
  try {
    await product.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//get product by id
// dont make const produc to product
Router.get("/get-product-by-id/:id", async (req, res) => {
  try {
    const produc = await product.findById(req.params.id).populate("seller");
    res.json({
      success: true,
      data: produc,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

// delete product
Router.delete("/delete-product/:id", authMiddleware, async (req, res) => {
  try {
    await product.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//get image from pc
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload image to cloudinary
Router.post(
  "/upload-image-to-product",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "DoNationMP",
      });

      const productId = req.body.productId;
      await product.findByIdAndUpdate(productId, {
        $push: { images: result.secure_url },
      });

      res.json({
        success: true,
        message: "Image uploaded successfully",
        data: result.secure_url,
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  }
);

//update product status
Router.put("/update-product-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedProduct = await product.findByIdAndUpdate(req.params.id, {
      status,
    });

    //send a notification to seller
    const newNotification = await new Notification({
      user: updatedProduct.seller,
      message: `Your product ${updatedProduct.name} has been ${status}`,
      title: "Product status updated",
      onclick: `/profile`,
      read: false,
    });

    await newNotification.save();

    res.json({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = Router;
