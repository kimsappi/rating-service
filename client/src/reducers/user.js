import { createGuestAccount } from '../services/auth';
import { setUser, getUser } from '../utils/localStorageActions';

const logInAction = data => {
  setUser(data);
  return {
    type: 'LOG_IN',
    data: data
  };
};

export const logOut = () => {
  return dispatch => {
    const data = null;
    setUser(data);
    dispatch({
      type: 'LOG_OUT',
      data: data
    });
  }
};

export const createGuest = () => {
  return async dispatch => {
    const data = await createGuestAccount();
    dispatch(logInAction(data));
  };
};

export const checkUserLoginOnLoad = () => {
  const data = getUser();
  return dispatch =>
    dispatch(logInAction(data));
};

const userReducer = (state = null, action) => {
  console.log(state);
  console.log(action);
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
