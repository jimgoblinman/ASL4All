const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => {
  console.log('Connected to the database');
});

app.use(express.json());
const donorRoutes = require('./routes/donors');
const feedbackRoutes = require('./routes/feedbacks');

// Routes
app.use('/donors', donorRoutes);
app.use('/feedbacks', feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
