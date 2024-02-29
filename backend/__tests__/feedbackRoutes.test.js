const request = require('supertest');
const express = require('express');
const app = express();
const feedbackRoutes = require('../routes/feedbacks');

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

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});