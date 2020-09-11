import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import { createGuest } from '../reducers/user';
import config from '../utils/config.js';
import { setAuthState } from '../utils/localStorageActions';

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.user);

  const createGuestAccount = () => {
    dispatch(createGuest(history));
  };

  const chars = 'qwertyuiopasdfghjklzxcvbnm1234567890';
  const authState = [...chars].map((char, index, array) => {
    if (Math.random() > 0.5)
      return array[Math.floor(Math.random() * array.length)];
    return '';
  }).join('');

  setAuthState(authState);

  const apiAuthUrl = config.apiAuthUrl[0] + config.apiClientId
    + config.apiAuthUrl[1] + config.apiRedirectUrl
    + config.apiAuthUrl[2] + authState;

  if (user)
    return (<Redirect to='/' />);

  else if (process.env.NODE_ENV === 'production')
    return (
      <>
        <div>
          Click the button below to authenticate with the 42 API. The information we store is:
          <ul>
            <li>Your 42 username and ID</li>
            <li>The URL of your image on the 42 CDN</li>
          </ul>
        </div>
        <a href={apiAuthUrl}><Button variant='outline-primary'>Log in with 42 API</Button></a>
      </>
    );
  
  else
    return (
      <div>
        <p>Development environment, please generate a guest account:</p>
        <Button variant='primary' onClick={createGuestAccount}>Use guest account</Button>
      </div>
    );
};

export default Auth;
