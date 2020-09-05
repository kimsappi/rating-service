import { fetchAllUsers } from '../services/allUsers';

export const fetchUsers = token => {
  return async dispatch => {
    const data = await fetchAllUsers(token);
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
