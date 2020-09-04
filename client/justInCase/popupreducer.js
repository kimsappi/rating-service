export const closePopup = () => {
  return dispatch =>
    dispatch({
      action: 'DESTROY'
    });
}

export const createPopup = type => {
  return dispatch =>
    dispatch({
      action: 'CREATE',
      data: type
    });
}

const popupReducer = (state = null, action) => {
  switch (action.type) {
  case 'CREATE':
    return action.data;

  case 'DESTROY':
    return null;

  default:
    return null;
  }
};

export default popupReducer;
