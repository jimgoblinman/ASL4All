const request = require('supertest');
const express = require('express');
const app = express();
const feedbackRoutes = require('../routes/feedbacks');
const feedbackService = require('../services/feedbackService');

app.use(express.json());
app.use('/feedbacks', feedbackRoutes);

describe('Feedback routes', () => {
    test('POST /feedbacks - Create new feedback', async () => {
        const response = await request(app)
            .post('/feedbacks')
            .send({ name: 'Alice', email: 'alice@outlook.com', feedback: 'Great service! Keep up the good work!' });

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Alice');
        expect(response.body.email).toBe('alice@outlook.com');
        expect(response.body.feedback).toBe('Great service! Keep up the good work!');
    });

    test('GET /feedbacks - Get all feedbacks', async () => {
        
        const response = await request(app).get('/feedbacks');
        
        console.log(response.statusCode); // Log the status code
        console.log(response.body);       // Log the parsed JSON body
        console.log(response.headers);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    },5000);
    
    test('POST /feedbacks - Missing Feedback Data', async () => {
        const response = await request(app)
            .post('/feedbacks')
            .send({ name: 'Bob', email: 'bob@example.com' });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Feedback is required.');
    });

    test('GET /feedbacks - Error getting all feedbacks', async () => {
        jest.spyOn(feedbackService, 'getAllFeedback').mockRejectedValue(new Error('Database connection failed'));
        const response = await request(app).get('/feedbacks');

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Database connection failed');
    });

    // Add more tests as needed
});
