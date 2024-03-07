const server = require('./app');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Donor Endpoints', () => {
  it('GET /donors should show all donors', async () => {
    const res = await requestWithSupertest.get('/donors');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });

  it('POST /donors should add a new donor', async () => {
    const newDonor = {
      name: 'John',
      lastName: 'Doe',
      amount_chf: 123
    };

    const res = await requestWithSupertest.post('/donors').send(newDonor)

    expect(res.status).toEqual(201); 
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toEqual(newDonor.name);
    expect(res.body.lastName).toEqual(newDonor.lastName);
    expect(res.body.amount_chf).toEqual(newDonor.amount_chf);
  });

  it('GET /feedback should show all feedbacks', async () => {
    const res = await requestWithSupertest.get('/feedbacks');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });

  it('POST /feedback should add a new feedback', async () => {
    const newDonor = {
      name: 'John Doe',
      email: 'john@example.com',
      feedback: 'hwiosaf iosdfsdf jsf'
    };

    const res = await requestWithSupertest.post('/feedbacks').send(newDonor)

    expect(res.status).toEqual(201); 
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toEqual(newDonor.name);
    expect(res.body.email).toEqual(newDonor.email);
    expect(res.body.feedback).toEqual(newDonor.feedback);
  });

  afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
  });
});
