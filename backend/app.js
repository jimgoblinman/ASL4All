const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {});

app.use(express.json());
const donorRoutes = require('./routes/donors');
const feedbackRoutes = require('./routes/feedbacks');

// Routes
app.use('/donors', donorRoutes);
app.use('/feedbacks', feedbackRoutes);

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on port ${server.address().port}`);
});

module.exports = server;
