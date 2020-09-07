import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../../reducers/user';

const LoggedIn = ({ user }) => {
  const dispatch = useDispatch();

  const logOutButton = () => {
    dispatch(logOut());
  };

  return (
    <>
      <div>Logged in as {user.username}</div>
      <button onClick={logOutButton}>Log out</button>
      <Link to='/new'>Submit new result</Link>
      <Link to='/users/me'>Profile</Link>
    </>
  );
};

const NotLoggedIn = () => (
  <div>
    <Link to='/auth'>Log in/Register</Link>
  </div>
);

const Header = () => {
  const user = useSelector(state => state.user);

  return (
    <header>
      {user ? <LoggedIn user={user} /> : <NotLoggedIn />}
    </header>
  );
};

export default Header;
