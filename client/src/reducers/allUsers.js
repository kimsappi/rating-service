import { fetchAllUsers } from '../services/allUsers';

export const fetchUsers = (token, alphaSort = false) => {
  return async dispatch => {
    const data = await fetchAllUsers(token, alphaSort);
    dispatch({
      type: 'SET_USERS',
      data: data
    });
  };
};

const allUsersReducer = (state = null, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USERS':
      return action.data;

    default:
      return state;
  }
};

export default allUsersReducer;
