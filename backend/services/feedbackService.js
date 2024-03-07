const Feedback = require('../model/feedback');

async function addFeedback(name, email, feedback) {
    try {
        const newFeedback = new Feedback({ name, email, feedback });
        await newFeedback.save();
        return newFeedback;
    } catch (error) {
        throw error;
    }
}

async function getAllFeedback() {
    try {
        const feedbacks = await Feedback.find();
        return feedbacks;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addFeedback,
    getAllFeedback
};