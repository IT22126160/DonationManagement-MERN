const express = require("express");
const router = express.Router();
let DDonation = require("../models/DDonation");
const multer = require('multer')
const path = require('path')
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


 //add donation
 router.post('/addDonation', async (req, res) => {
    const { fullName, email, address, donationType, payment,imgUrl, itemName, quantity } = req.body;
  
    try {
      const newDonation = new DDonation({
        fullName,
        email,
        address,
        donationType,
        payment,
        imgUrl,
        itemName,
        quantity,
      });
  
      // Save the new donation to the database
      await newDonation.save();
  
      res.status(200).json({ message: 'New Donation Added' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error adding donation' });
    }
  });

//all donations
router.route("/allDonation").get(async (req, res) => {
    try {
        const allDonations = await DDonation.find({});
    
        const categorizedItems = {};
        const totalQuantities = {};
        let totalAmount = 0;
    
        allDonations.forEach((donation) => {
          const { _id, fullName, email, address, donationType, payment, itemName, quantity } = donation;
    
          if (categorizedItems[itemName]) {
            categorizedItems[itemName] += quantity;
            totalQuantities[itemName] += quantity;
          } else {
            categorizedItems[itemName] = quantity;
            totalQuantities[itemName] = quantity;
          }
    
          totalAmount += payment; // Assuming "payment" field represents the amount donated
        });
    
        res.status(200).send({
          status: "Success",
          donations: allDonations,
          categorizedItems,
          totalQuantities,
          totalAmount,
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error", error: err.message });
      }
});

router.route("/updateDonation/:id").put(async (req,res) => {
    let donationId = req.params.id;
    const { fullName, email, address, donationType, payment, itemName, quantity } = req.body;

    const updateDonation = {
        fullName,
        email,
        address,
        donationType,
        payment,
        itemName,
        quantity
    }

    const update = await DDonation.findByIdAndUpdate(donationId, updateDonation)
    .then( () => {
        res.status(200).send( {status: "Donation Updated"});
    }).catch( (err) => {
        console.log(err);
        res.status(500).send( {status: "Error with updating data", error: err.message});
    })
});

router.route("/deleteDonation/:id").delete( async (req,res) => {
    const id = req.params.id;
    DDonation.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
});

//for update from admin
router.route("/getDonation/:id").get(async (req, res) => {
    const id = req.params.id;
    DDonation.findById({_id:id})
    .then(Donation => res.json(Donation))
    .catch(err => res.json(err))
});

router.route("/getDonation/:email").get(async (req, res) => {
  try {
      const donations = await DDonation.find({ email: req.params.email });
      if (!donations) {
          return res.status(404).json({ message: "No donations found for this email" });
      }
      res.status(200).json({ donations });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Error fetching donations" });
  }
});

 module.exports = router;