const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//declare attributes
const donationSchema = new Schema({
    fullName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    donationType: {
        type: String,
        required: true
    },
    payment: {
        type: Number,
        required: function() {
            return this.donationType === 'cash'; 
        }
    },
    imgUrl: { 
        type: String,
        required: function() {
            return this.donationType === 'cash'; 
        }
      },
    itemName: {
        type: String,
        required: function() {
            return this.donationType === 'items'; 
        }
    },
    quantity: {
        type: Number,
        required: function() {
            return this.donationType === 'items'; 
        }
    },
    status: { 
        type: String, 
        enum: ['pending', 'success', 'unsuccess'], 
        default: 'pending' 
    },
})

donationSchema.pre('save', async function(next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const lastDonation = await this.constructor.findOne({}, {}, { sort: { donationId: -1 } });
        let newDonationId = 1;

        if (lastDonation) {
            newDonationId = lastDonation.donationId + 1;
        }

        this.donationId = newDonationId;
        next();
    } catch (err) {
        next(err);
    }
});

const DDonation = mongoose.model("DDonation",donationSchema);

//module export
module.exports = DDonation;