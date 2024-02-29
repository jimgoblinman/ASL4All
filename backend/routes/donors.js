const express = require('express');
const router = express.Router();
const donorService = require('../services/donorService');

// Middleware function to validate donor data
function validateDonorData(req, res, next) {
    const { name, lastName, amount_chf } = req.body;
    if (!name || !lastName || !amount_chf) {
        return res.status(400).json({ message: "Name, lastName, and amount are required." });
    }
    next(); // Call next() to proceed to the next middleware or route handler
}

// Route for adding a new donor with middleware
router.post('/', validateDonorData, async (req, res) => {
    try {
        const { name, lastName, amount_chf } = req.body;
        const donor = await donorService.addDonor(name, lastName, amount_chf);
        res.status(201).json(donor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for getting all donors
router.get('/', async (req, res) => {
    try {
        const donors = await donorService.getAllDonors();
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;