import axios from 'axios';

import * as config from '../config.json';
import { getAuthHeader } from '../utils/auth';

export const createGuestAccount = async () => {
  try {
    const result = await axios.post(config.baseUrl + '/auth/createGuest');
    return result.data;
  } catch(err) {
    console.error(err);
    alert('Couldn\'t create guest account! Something is probably wrong with the server.');
    return null;
  }
};

export const refreshTokenAndData = async token => {
  try {
    const result = await axios.get(
      config.baseUrl + '/users/refreshToken',
      {headers: getAuthHeader(token)}
    );
    return result.data;
  } catch(err) {
    console.error(err);
    return null;
  }
};
