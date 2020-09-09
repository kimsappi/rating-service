import React, { useEffect } from 'react';
import parseSearchString from '../utils/parseSearchString';
import { Redirect } from 'react-router-dom';
import { getAuthState } from '../utils/localStorageActions';
import { useDispatch } from 'react-redux';

const ApiReturn = () => {
  const dispatch = useDispatch();

  const data = parseSearchString(window.location.search);
  
  useEffect(() => {
    if (data)
      dispatch()
  }, [data, dispatch]);

  if (!data || !data.code || !data.state || data.state !== getAuthState())
    return <Redirect to='/?authFailure=1' />

  return (<div>Logging in</div>);
};

export default ApiReturn;
