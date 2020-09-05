import { createGuestAccount } from '../services/auth';

const logIn = data => {
  return {
    type: 'LOG_IN',
    data: data
  };
};

export const createGuest = () => {
  return async dispatch => {
    const data = await createGuestAccount();
    dispatch(logIn(data));
  };
};

export const createGuestA = async () => {
  const data = await createGuestAccount();
  console.log(data)
    return {
        type: 'LOG_IN',
        data: data
    }
};

const userReducer = (state = null, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case 'LOG_IN':
      return state;

    default:
      return null;
  }
};

export default userReducer;
