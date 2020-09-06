import axios from 'axios';
import * as config from '../config.json';
import { getAuthHeader } from '../utils/auth';

export const sendScore = async (player1, player2, score1, score2, user) => {
  try {
    const res = await axios.post(config.baseUrl + '/matches/new',
      {
        player1, player2, score1, score2
      },
      {
        headers: getAuthHeader(user.token)
      });
    return res;
  } catch(err) {
    console.error(err);
    alert('Couldn\'t submit score! Something is probably wrong with the server.');
    return null;
  }
}
