const supertest = require('supertest');
const app = require('../src/app');

const api = supertest(app);
const { createGuestAccount } = require('../src/services/auth');
const { generateJWT } = require('../src/modules/auth');

let submitterId = 0;
let token = '';
let player1 = '';
let player2 = '';

const highScore = 15;
const lowScore = 5;

describe('New match submissions', () => {
  test('New match is submitted correctly', async () => {
    const response = await api
      .post('/api/matches/new')
      .set('Authorization', `bearer ${token}`)
      .send({
        score1: highScore,
        score2: lowScore,
        player1: player1,
        player2: player2
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = response.body;
    expect(res.draw).toBe(false);
    expect(res.winner_score).toBe(highScore);
    expect(res.loser_score).toBe(lowScore);
    expect(res.id).toBeDefined();
    expect(res.submitter).toBe(submitterId);
  });

  test('Draw is correctly flagged', async () => {
    const response = await api
      .post('/api/matches/new')
      .set('Authorization', `bearer ${token}`)
      .send({
        score1: highScore,
        score2: highScore,
        player1: player1,
        player2: player2
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = response.body;
    expect(res.draw).toBe(true);
    expect(res.winner_score).toBe(highScore);
    expect(res.loser_score).toBe(highScore);
    expect(res.id).toBeDefined();
    expect(res.submitter).toBe(submitterId);
  });

  test('Incorrect username ', async () => {
    const response = await api
      .post('/api/matches/new')
      .set('Authorization', `bearer ${token}`)
      .send({
        score1: highScore,
        score2: highScore,
        player1: 'THIS PLAYER SHOULD NOT BE FOUND',
        player2: player2
      })
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  beforeAll(done => {
    const initialiseAccounts = async () => {
      const guest1 = await createGuestAccount();
      const guest2 = await createGuestAccount();

      player1 = guest1.username;
      player2 = guest2.username;
      token = generateJWT(guest1);
      submitterId = guest1.id;

      done();
    };
    initialiseAccounts();
  });
});
