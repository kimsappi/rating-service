export const setUser = data => {
  localStorage.setItem('user', JSON.stringify(data));
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
}

export const setAuthState = authState =>
  localStorage.setItem('authState', authState);

export const getAuthState = () =>
  localStorage.getItem('authState');
