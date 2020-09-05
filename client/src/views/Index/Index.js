import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUsers } from '../../reducers/allUsers';

const NotLoggedIn = () => (
  <div>You must <Link to='/auth'>log in</Link> to access the service!</div>
);

const RankingCard = (user, rank, me) => (
  <div key={rank}>
    {rank}. {user.username} {user.rating} {me.id === user.id && 'That\'s me!'}
  </div>
);

const LoggedIn = ({user}) => {
  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.allUsers);

  useEffect(() => {
    dispatch(fetchUsers(user.token));
  }, [dispatch]);

  if (allUsers === null)
    return (<div>Something is wrong with the server, check back later!</div>);
  else if (!allUsers.length)
    return (<div>No users yet!</div>);
  else
    return allUsers.map((current, index) => RankingCard(current, index + 1, user));
}

const Index = () => {
  const user = useSelector(state => state.user);

  return (
    <div>
      {user ? <LoggedIn user={user} /> : <NotLoggedIn />}
    </div>
  );
};

export default Index;
