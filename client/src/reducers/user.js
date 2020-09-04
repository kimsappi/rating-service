export const logIn = data => {
  console.log(data);
  return dispatch => {
    dispatch({
      type: 'LOG_IN',
      data: data
    });
  };
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
