const request = require('supertest');
const express = require('express');
const app = express();
const donorRoutes = require('../routes/donors');

app.use('/donors', donorRoutes);

describe('Donor routes', () => {
    test('POST /donors - Create a new donor', async () => {
        const response = await request(app)
            .post('/donors')
            .send({ name: 'John', lastName: 'Doe', amount_chf: 100 });

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('John');
        expect(response.body.lastName).toBe('Doe');
        expect(response.body.amount_chf).toBe(100);
    });

    test('GET /donors - Get all donors', async () => {
        const response = await request(app).get('/donors');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
