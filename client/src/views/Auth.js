import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { createGuestAccount } from '../services/auth';

const Auth = () => {
  const user = useSelector(state => state.user);

  if (user)
    return (<Redirect to='/' />);

  else if (process.env.NODE_ENV === 'production')
    return (
      <a href='#'><button>Log in with 42</button></a>
    );
  
  else
    return (
      <button onClick={createGuestAccount}>Use guest account</button>
    );
};

export default Auth;
