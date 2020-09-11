import axios from 'axios';

import config from '../utils/config.js';
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
      config.baseUrl + '/refreshToken',
      {headers: getAuthHeader(token)}
    );
    return result.data;
  } catch(err) {
    console.error(err);
    return null;
  }
};

export const apiLogin = async code => {
  try {
    const result = await axios.post(config.baseUrl + '/auth/apiLogin', {
      code: code
    });
    return result.data;
  } catch(err) {
    console.error(err);
    alert('Couldn\'t authenticate through API.');
    return null;
  }
};
