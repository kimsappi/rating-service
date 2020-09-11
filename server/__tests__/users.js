const supertest = require('supertest');
const app = require('../src/app');

const api = supertest(app);

const { createGuestAccount } = require('../src/services/auth');
const { generateJWT } = require('../src/modules/auth');

describe('Fetching a single user\'s data', () => {
  let token = '';
  let tokenHolder = null;
  let otherUser = null;

  test('Fetching token holder\'s data (/me)', async () => {
    const response = await api
      .get('/api/users/me')
      .set('Authorization', `bearer ${token}`)
      .expect(200);

    const res = response.body;
    expect(res.user.id).toBe(tokenHolder.id);
    expect(res.user.match_count).toBe(0);
    expect(res.matches).toHaveLength(0);
  });

  test('Fetching someone else\'s data through id', async () => {
    const response = await api
      .get('/api/users/' + otherUser.id)
      .set('Authorization', `bearer ${token}`)
      .expect(200);

    const res = response.body;
    expect(res.user.id).toBe(otherUser.id);
    expect(res.user.match_count).toBe(0);
    expect(res.matches).toHaveLength(0);
  });

  test('Fetching someone else\'s data through username', async () => {
    const response = await api
      .get('/api/users/' + otherUser.username)
      .set('Authorization', `bearer ${token}`)
      .expect(200);

    const res = response.body;
    expect(res.user.id).toBe(otherUser.id);
    expect(res.user.match_count).toBe(0);
    expect(res.matches).toHaveLength(0);
  });

  test('Fetching a non-existent account by id', async () => {
    const response = await api
      .get('/api/users/0')
      .set('Authorization', `bearer ${token}`)
      .expect(400);
  });

  test('Fetching a non-existent account by id', async () => {
    const response = await api
      .get('/api/users/ACCOUNTSHOULDNOTEXIST')
      .set('Authorization', `bearer ${token}`)
      .expect(400);
  });

  beforeAll(done => {
    const initialiseAccount = async () => {
      const guest1 = await createGuestAccount();
      const guest2 = await createGuestAccount();
      tokenHolder = guest1;
      otherUser = guest2;

      token = generateJWT(guest1);

      done();
    };
    initialiseAccount();
  });
});
