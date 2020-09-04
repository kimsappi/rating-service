import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(state => state.user);

  return (
    <div>Header
      {user && 'logged in'}
      {!user && 'not logged in'}
    </div>
  );
};

export default Header;
