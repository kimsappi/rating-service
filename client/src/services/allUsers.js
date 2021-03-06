import axios from 'axios';
import config from '../utils/config.js';
import { getAuthHeader } from '../utils/auth';

export const fetchAllUsers = async (token, alphaSort) => {
  const endpoint = alphaSort ? '/users?sort=alpha' : '/users';
  try {
    const result = await axios.get(
      config.baseUrl + endpoint,
      {headers: getAuthHeader(token)}
    );
    return result.data;
  } catch(err) {
    console.error(err);
    return null;
  }
};
