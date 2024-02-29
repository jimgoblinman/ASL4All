const Donor = require('../model/donor');

async function addDonor(name, lastName, amount_chf) {
    try {
        const donor = new Donor({ name, lastName, amount_chf });
        await donor.save();
        return donor;
    } catch (error) {
        throw error;
    }
}

async function getAllDonors() {
    try {
        const donors = await Donor.find();
        return donors;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addDonor,
    getAllDonors
};