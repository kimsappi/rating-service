import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import { logOut } from '../../reducers/user';

const LoggedIn = ({ user }) => {
  const dispatch = useDispatch();

  const logOutButton = event => {
    event.preventDefault();
    dispatch(logOut());
  };

  return (
    <>
      <Link to='#' onClick={logOutButton}>Log out</Link>
      <Link to='/new'>Submit new result</Link>
      <Link to='/users/me' style={{fontWeight: 'bold'}}>{user.username}</Link>
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
      <Nav className='navbar navbar-expand-lg navbar-light bg-light'>
        {user ? <LoggedIn user={user} /> : <NotLoggedIn />}
      </Nav>
    </header>
  );
};

export default Header;
