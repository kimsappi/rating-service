const axios = require('axios');
const config = require('../modules/config');
const FormData = require('form-data');

const getToken = async code => {
  const formData = new FormData();
  formData.append('grant_type', 'authorization_code');
  formData.append('client_id', config.API_CLIENT_ID);
  formData.append('client_secret', config.API_CLIENT_SECRET);
  formData.append('code', code);
  formData.append('redirect_uri', config.API_REDIRECT_URI);

  const res = await axios.post(config.authApiUrl + '/oauth/token', formData, {
    headers: formData.getHeaders()
  });
  return res.data;
};

const getUserFromApi = async token => {
  const res = await axios.get(config.authApiUrl + '/v2/me', {
    headers: {Authorization: `Bearer ${token}`}
  });
  return res.data;
};

module.exports = {
  getToken,
  getUserFromApi
};
