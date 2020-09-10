import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createGuest } from '../reducers/user';
import * as config from '../config.json';
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
    + config.apiAuthUrl[1] + config.apiRedirectUrl + config.apiAuthUrl[2]
    + authState;

  if (user)
    return (<Redirect to='/' />);

  else if (process.env.NODE_ENV === 'production')
    return (
      <a href={apiAuthUrl}><button>Log in with 42</button></a>
    );
  
  else
    return (
      <div>
        <p>Development environment, please generate a guest account</p>
        <button onClick={createGuestAccount}>Use guest account</button>
      </div>
    );
};

export default Auth;
