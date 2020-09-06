const supertest = require('supertest')
const app = require('../src/app')

const api = supertest(app)

test('Guest account is created and returned', async () => {
  const response = await api
    .post('/api/auth/createGuest')
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const res = response.body;
  expect(res.token).toBeDefined();
  expect(res.token).not.toBe(null);
  expect(res.id).toBeDefined();
});

beforeAll(() => {
  
});

afterAll(() => {

});
