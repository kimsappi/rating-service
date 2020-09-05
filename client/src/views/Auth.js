import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createGuest } from '../reducers/user';

const Auth = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const dispTest = () => {
    dispatch(createGuest());
  }

  if (user)
    return (<Redirect to='/' />);

  else if (process.env.NODE_ENV === 'production')
    return (
      <a href='#'><button>Log in with 42</button></a>
    );
  
  else
    return (
      <button onClick={dispTest}>Use guest account</button>
    );
};

export default Auth;
