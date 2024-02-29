const express = require('express');
const router = express.Router();
const feedbackService = require('../services/feedbackService');

// Middleware function to validate feedback data
function validateFeedbackData(req, res, next) {
    const { feedback } = req.body;
    if (!feedback) {
        return res.status(400).json({ message: "Feedback is required." });
    }
    next(); // Call next() to proceed to the next middleware or route handler
}

// Route for adding new feedback with middleware
router.post('/', validateFeedbackData, async (req, res) => {
    try {
        const { name, email, feedback } = req.body;
        const newFeedback = await feedbackService.addFeedback(name, email, feedback);
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for getting all feedback
router.get('/', async (req, res) => {
    try {
        const feedbacks = await feedbackService.getAllFeedback();
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;