import React, { useEffect } from 'react';
import parseSearchString from '../utils/parseSearchString';
import { Redirect, useHistory } from 'react-router-dom';
import { getAuthState } from '../utils/localStorageActions';
import { useDispatch } from 'react-redux';
import { loginThroughApi } from '../reducers/user';

const ApiReturn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const data = parseSearchString(window.location.search);
  
  useEffect(() => {
    console.log(data);
    if (data) {
      dispatch(loginThroughApi(data.code, history));
      history.push('/?loginSuccess=1');
    }
  }, [data, dispatch]);

  if (!data || !data.code || !data.state || data.state !== getAuthState())
    return <Redirect to='/?authFailure=1' />

  return (<div>Logging in</div>);
};

export default ApiReturn;
