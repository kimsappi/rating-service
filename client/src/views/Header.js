import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import { logOut } from '../reducers/user';
import ProfileImage from '../components/ProfileImage';

import '../styles/Header.css';

const LoggedIn = ({ user }) => {
  const dispatch = useDispatch();

  const logOutButton = event => {
    event.preventDefault();
    dispatch(logOut());
  };

  return (
    <Navbar class='navbar-inner' expand='md' bg='light' variant='light'>
      <div class='container'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Link to='/'>Home</Link>
            <Link to='/new'>Submit result</Link>
          </Nav>
          <Nav>
            <Link to='#' onClick={logOutButton}>Log out</Link>
            <Link to='/users/me' style={{fontWeight: 'bold'}}>
              <ProfileImage url={user.imageurl} />
              {user.username}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

const NotLoggedIn = () => (
  <Navbar bg='light' variant='light'>
    <div class='container'>
      <Nav className='mr-auto'></Nav>
      <Nav>
        <Link to='/auth'>Log in/Register</Link>
      </Nav>
    </div>
  </Navbar>
);

const Header = () => {
  const user = useSelector(state => state.user);

  return (
    <header class='navbar-static-top'>
        {user ? <LoggedIn user={user} /> : <NotLoggedIn />}
    </header>
  );
};

export default Header;
