import axios from 'axios';
import * as config from '../config.json';
import { getAuthHeader } from '../utils/auth';

const getProfileData = async (id, user) => {
  try {
    const res = await axios
      .get(
        config.baseUrl + '/users/' + id,
        {headers: getAuthHeader(user.token)}
      );
    return res.data;
  } catch (err) {
    console.error(err);
    return 'Profile not found';
  }
};

export default getProfileData;
