const mongoose = require('mongoose');

const feedbackType = Object.freeze({
    PROBLEM: 'Problem',
    SUGGESTION: 'Suggestion',
    PRAISE: 'Praise',
    OTHER: 'Other'
});

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    feedback: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },

    feedbackType: {
        type: String,
        enum: Object.values(feedbackType),
        required: true,
    }

});

module.exports = mongoose.model('Feedback', feedbackSchema);
