const router = require("express").Router();
const authmmiddleware = require("../middlewares/authMiddleware");

const Notification = require("../models/notificationsModel");

//add a notification

router.post("/notify", authmmiddleware, async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.json({
      success: true,
      message: "notification added successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

// get all notification by user

router.get("/get-all-notifications", authmmiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//delete notification
router.delete("/delete-notification/:id", authmmiddleware, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "notification deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//read all notifications by user
router.put("/read-all-notifications/:id", authmmiddleware, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.body.userId, read: false },
      { $set: { read: true } }
    );
    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
