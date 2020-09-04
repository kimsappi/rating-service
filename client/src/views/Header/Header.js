import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LoggedIn = () => (
  <div>Logged in</div>
);

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
