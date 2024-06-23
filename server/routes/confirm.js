const router = require("express").Router();
const confirmation = require("../models/confirm");
const nodemailer = require("nodemailer");

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'nesandu2002@gmail.com', // Your email address
    pass: 'kydx ydfk hsrz mwru' // Your email password
  }
});

// Route for adding confirmation
router.route("/addconfirm").post((req, res) => {
  const { name, phone, email, time } = req.body;

  const newConfirmation = new confirmation({
    name,
    phone,
    email,
    time
  });

  newConfirmation.save()
    .then(() => {
      // Send email
      const mailOptions = {
        from: 'nesandu2002@gmail.com',
        to: email,
        subject: 'Confirmation Received',
        text: `Dear ${name},\n\nThank you for confirming your participation. We have received your confirmation for our event.\n\nRegards,\nDoNation`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).json("Error occurred while sending email");
        } else {
          console.log('Email sent: ' + info.response);
          res.json("Confirmation added successfully");
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Error occurred while adding confirmation");
    });
});

// Route for reading confirmation
router.route("/read").get((req, res) => {
  confirmation.find()
    .then((confirmations) => {
      res.json(confirmations);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Error occurred while fetching confirmations");
    });
});

module.exports = router;