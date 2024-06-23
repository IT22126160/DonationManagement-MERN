const router = require("express").Router();
let Donation = require("../models/Donation");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const bank = req.body.bank;
  const nic = req.body.nic;
  const gmail = req.body.gmail;
  const date = req.body.date;
  const payment = req.body.payment;

  const newDonation = new Donation({
    name,
    bank,
    nic,
    gmail,
    date,
    payment,
  });

  newDonation
    .save()
    .then(() => {
      res.json("Donation added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Donation.find()
    .then((Donation) => {
      res.json(Donation);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").post(async (req, res) => {
  // Change the method to POST
  let userId = req.params.id;
  const { name, bank, nic, gmail, date, payment } = req.body;

  const updateMembership = {
    name,
    bank,
    nic,
    gmail,
    date,
    payment,
  };

  try {
    const updatedMembership = await Membership.findByIdAndUpdate(
      userId,
      updateMembership,
      { new: true }
    );
    res.status(200).json({ status: "Updated", updatedMembership });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Updating Error", error: error.message });
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Donation.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Delete Error", error: err.message });
    });
});

module.exports = router;
