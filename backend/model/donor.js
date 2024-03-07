const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    amount_chf: {
        type: Number,
        required: true,
    },
    donationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Donor', donorSchema);