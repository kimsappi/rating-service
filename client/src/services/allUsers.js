import axios from 'axios';
import * as config from '../config.json';
import { getAuthHeader } from '../utils/auth';

export const fetchAllUsers = async token => {
  try {
    const result = await axios.get(
      config.baseUrl + '/users',
      {headers: getAuthHeader(token)}  
    );
    return result.data;
  } catch(err) {
    console.error(err);
    return null;
  }
};
