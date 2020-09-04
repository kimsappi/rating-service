import axios from 'axios';
import * as config from '../config.json';

import { logIn } from '../reducers/user';

export const createGuestAccount = async () => {
  try {
    const result = await axios.post(config.baseUrl + '/auth/createGuest');
    logIn(result.data);
  } catch(err) {
    console.log(err);
    alert('Couldn\'t create guest account! Something is probably wrong with the server.');
  }
};
