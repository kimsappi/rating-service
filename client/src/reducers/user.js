import {
  createGuestAccount,
  refreshTokenAndData,
  apiLogin } from '../services/auth';
import { setUser, getUser } from '../utils/localStorageActions';

const logInAction = (data, history, redirect = false) => {
  setUser(data);
  if (data && redirect)
    history.push('/?loginSuccess=1');
  else if (redirect)
    history.push('/?loginFailure=1');
  return {
    type: 'LOG_IN',
    data: data
  };
};

export const logOut = history => {
  return dispatch => {
    history.push('/?loggedOut=1');
    const data = null;
    setUser(data);
    dispatch({
      type: 'LOG_OUT',
      data: data
    });
  }
};

export const createGuest = history => {
  return async dispatch => {
    const data = await createGuestAccount();
    dispatch(logInAction(data, history, true));
  };
};

export const loginThroughApi = (code, history) => {
  return async dispatch => {
    const data = await apiLogin(code);
    dispatch(logInAction(data, history, true));
  };
};

export const checkUserLoginOnLoad = history => {
  return async dispatch => {
    const data = getUser();
    if (data)
      try {
        const newData = await refreshTokenAndData(data.token);
        dispatch(logInAction(newData, history));
      } catch(err) {
        dispatch(logOut(history));
      }
    else
      dispatch({
        type: 'DO_NOTHING'
      });
  }
};

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;

    case 'LOG_OUT':
      return action.data;

    default:
      return state;
  }
};

export default userReducer;
