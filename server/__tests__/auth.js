const supertest = require('supertest');
const app = require('../src/app');

const api = supertest(app);

const { createGuestAccount } = require('../src/services/auth');
const { generateJWT } = require('../src/modules/auth');

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

describe('Token refreshing', () => {
  let token = '';

  test('Token is refreshed', async done => {
    setTimeout(async () => {
      const response = await api
        .get('/api/users/refreshToken')
        .set('Authorization', `bearer ${token}`)
        .expect(200);

      const returnedToken = response.body.token;
      expect(returnedToken).not.toBe(token);

      // Refreshing the returned token again, in case I change
      // the return values of either function.
      // (The first refreshed token could be different just 
      // because it contains different data.)
      setTimeout(async () => {
        const res2 = await api
          .get('/api/users/refreshToken')
          .set('Authorization', `bearer ${returnedToken}`)
          .expect(200);

        expect(res2.body.token).not.toBe(returnedToken);
        done();
      }, 1500);
    }, 1500);
  });

  test('Refreshing without a valid token fails', async () => {
    const response = await api
      .get('/api/users/refreshToken')
      .set('Authorization', `bearer none`)
      .expect(401);

    const error = response.body;
    expect(error).toBe('auth error');
  });

  beforeAll(done => {
    const initialiseAccount = async () => {
      const guest1 = await createGuestAccount();

      token = generateJWT(guest1);

      done();
    };
    initialiseAccount();
  });
})
