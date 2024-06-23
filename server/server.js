const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());

require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 5001;

const usersRoute = require("./routes/usersRoute");
const productsRoute = require("./routes/productsRoute");
const bidsRoute = require("./routes/bidsRoute");
const notificationsRoute = require("./routes/notificationsRoute");
const inventoryRoute = require("./routes/inventoryRoute");

app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/bids", bidsRoute);
app.use("/api/notifications", notificationsRoute);
app.use("/api/inventoryitems", inventoryRoute);

//financial manager
const DonationRouter = require("./routes/Donation.js");
const MembershipRouter = require("./routes/Membership.js");
app.use("/Donation", DonationRouter);
app.use("/Membership", MembershipRouter);

//CR manager
const customerRouter = require("./routes/customers.js");
const feedbackRouter = require("./routes/feedback.js");

app.use("/customer",customerRouter);
app.use("/feedback", feedbackRouter);

//career manager

app.use(cors());
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./routes/vRouter");
app.use("/api", router);

//events
const eventsRouter = require("./routes/events.js");
app.use("/event", eventsRouter);

const confirmRouter = require("./routes/confirm.js");
app.use("/confirm", confirmRouter);

//donation
const donationRouter = require("./routes/DDonation.js");
app.use("/donation", donationRouter);

app.listen(port, () => console.log(`Node/Express server run on port ${port}`));
