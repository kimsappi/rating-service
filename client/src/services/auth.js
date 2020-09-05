import axios from 'axios';
import * as config from '../config.json';

export const createGuestAccount = async () => {
  try {
    const result = await axios.post(config.baseUrl + '/auth/createGuest');
    return result.data;
  } catch(err) {
    console.error(err);
    alert('Couldn\'t create guest account! Something is probably wrong with the server.');
  }
};
