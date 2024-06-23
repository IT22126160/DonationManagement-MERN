const express = require("express");
const router = express.Router();
const multer = require('multer');
const Volunteer = require("../models/model");

//Add voluneer
router.route("/addV").post((req,res)=> {
    const image = (req.body.image);
    const fname = req.body.fname;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const birthday = req.body.birthday;
    const nid = req.body.nid;
    const email = req.body.email;
    const contact= Number(req.body.contact);
    const interest = req.body.interest;
    const work = Number(req.body.work);

    const newVolunteer = new Volunteer({
        image,
        fname ,
        age ,
        gender ,
        birthday ,
        nid ,
        email ,
        contact,
        interest,
        work 

    })

    newVolunteer.save().then(()=> {
        res.json("Volunteer Added.")
    }).catch((error)=> {
        console.log(error);
        res.status(500).send("Error adding volunteer.");
    })
})

//all volunteers
router.route("/").get((req,res)=>{

    Volunteer.find().then((Volunteers) => {
        res.json(Volunteers);
    }).catch((error)=> {
        console.log(error);
    })
})



router.route("/updateV/:id").put(async (req, res) => {
    const nid = req.params.id; // Get the volunteer ID from the request params
    const {
        fname,
        age,
        gender,
        birthday,
        email,
        contact,
        interest,
        work
    } = req.body;

    try {
        const updatedVolunteer = await Volunteer.findOneAndUpdate(
            { nid: nid }, // Find the volunteer by nid (use nid instead of id)
            { fname, age, gender, birthday, email, contact, interest, work }, // Updated data
            { new: true } // Return the updated document
        );

        if (!updatedVolunteer) {
            return res.status(404).send({ status: "User not found", error: "User with provided nationalId not found" });
        }

        res.status(200).send({ status: "User Updated", user: updatedVolunteer });
    } catch (error) {
        console.error("Error updating volunteer:", error);
        res.status(500).send({ status: "Error updating data", error: error.message });
    }
});


router.route("/deleteV/:id").delete(async (req,res) => {
    let nid = req.params.id;

    await Volunteer.findOneAndDelete(nid).then(()=>{
        res.status(200).send({status:"User deleted" })
    }).catch((error)=>  {
        console.log(error.message);
        res.status(500).send({status: "Error with delete user",error:error.message});
    })
})


//get only one user details

router.route("/get/:id").get(async (req, res) => {
    let nid = req.params.id;

    try {
        const volunteer = await Volunteer.findOne({ nid }); // Construct the query object
        if (!volunteer) {
            return res.status(404).send({ status: "User not found", error: "User with provided nationalId not found" });
        }
        res.status(200).send({ status: "User Fetched", user: volunteer });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error with get user", error: error.message });
    }
});

//own profile
router.route("/profile").get(async (req, res) => {
    const nid = req.user.nid; // Assuming you have authentication middleware setting req.user.nid

    try {
        const volunteer = await Volunteer.findOne({ nid }); // Find the volunteer by nid
        if (!volunteer) {
            return res.status(404).send({ status: "User not found", error: "User with provided nid not found" });
        }
        res.status(200).send({ status: "User Profile Fetched", user: volunteer });
    } catch (error) {
        console.error("Error fetching volunteer profile:", error);
        res.status(500).send({ status: "Error fetching user profile", error: error.message });
    }
});



//application
// vRouter.js
const Application = require('../models/modelApplication'); // Corrected import statement

//image 

// const storage = multer.diskStorage({
//     destination: function(req,file, cb) {
//         cb(null,"../client/public/assests/volunteer");
//     },
//     filename: function(req,file,cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });

// const upload = multer({storage: storage});

//Applications
router.get('/applications', async (req, res) => {
    try {
      // Fetch applications from the database
      const applications = await Application.find();
      res.json(applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ error: 'Error fetching applications' });
    }
  });

  
router.post("/apply", async (req, res) => {
    try {
        const { image, fname, age, gender, birthday, nid, email, contact, interest, work } = req.body;

        // Create a new application instance
        const newApplication = new Application({
            image,
            fname,
            age: Number(age),
            gender,
            birthday,
            nid,
            email,
            contact: Number(contact),
            interest,
            work: Number(work)
        });

        // Save the new application to the database
        await newApplication.save();

        res.json("Volunteer application submitted successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error submitting volunteer application.");
    }
});

// router.post("/apply",upload.single("image"), (req, res) => {
//     // Extract data from the request body
//     const { image,fname, age, gender, birthday, nid, email, contact, interest, work } = req.body;

//     // Create a new application instance
//     const newApplication = new Application({
//         image,
//         fname,
//         age: Number(age),
//         gender,
//         birthday,
//         nid,
//         email,
//         contact: Number(contact),
//         interest,
//         work: Number(work)
//     });
//     newApplication.image="../../../assests/volunteer/"+req.file.filename;
//     console.log(newApplication.nid);

//     // Save the new application to the database
//     newApplication.save()
//         .then(() => {
//             res.json("Volunteer application submitted successfully.");
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(50

//applicationAccept Update
router.post("/acceptApplication/:id", async (req, res) => {
    try {
      const id = req.params.id;
      // Find the application by ID and update its status to "accepted" in the database
      await Application.findByIdAndUpdate(id, { status: "accepted" });
      res.json({ message: "Application accepted successfully." });
    } catch (error) {
      console.error("Error accepting volunteer application:", error);
      res.status(500).json({ error: "Error accepting volunteer application." });
    }
  });


  //delete application

  router.route("/applications/:id").delete(async (req, res) => {
    try {
        const id = req.params.id;
        // Find the application by ID and delete it from the database
        await Application.findByIdAndDelete(id);
        res.status(200).json({ message: "Application deleted successfully." });
    } catch (error) {
        console.error("Error deleting volunteer application:", error);
        res.status(500).json({ error: "Error deleting volunteer application." });
    }
});


router.get('/profile/:nid', async (req, res) => {
    try {
        const nid = req.params.nid;
        // Fetch the volunteer's data by ID from the database
        const volunteer = await Application.findOne({ nid: req.params.nid });

        res.json(volunteer);
    } catch (error) {
        console.error('Error fetching volunteer data:', error);
        res.status(500).json({ error: 'Error fetching volunteer data' });
    }
});

module.exports = router;