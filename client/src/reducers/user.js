const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return state;

  default:
    return null;
  }
};

export default userReducer;
