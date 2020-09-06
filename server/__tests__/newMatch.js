const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const { createGuestAccount } = require('../services/auth');
const { generateJWT } = require('../modules/auth');

let token = '';
let player1 = '';
let player2 = '';

describe('New match submissions', () => {
  test('New match is submitted correctly', async () => {
    const response = await api
      .post('/api/matches/new')
      .set('Authorization', `bearer ${token}`)
      .send({
        score1: 5,
        score2: 5,
        player1: player1,
        player2: player2
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = response.body;
    expect(res.token).toBeDefined();
    expect(res.token).not.toBe(null);
    expect(res.id).toBeDefined();
  });

  beforeAll(done => {
    const initialiseAccounts = async () => {
      const guest1 = await createGuestAccount();
      const guest2 = await createGuestAccount();

      player1 = guest1.username;
      player2 = guest2.username;
      token = generateJWT(guest1);

      done();
    };
    initialiseAccounts();
  });
});
