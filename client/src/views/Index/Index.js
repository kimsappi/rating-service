import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';

import { fetchUsers } from '../../reducers/allUsers';
import parseSearchString from '../../utils/parseSearchString';

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
  }, [dispatch, user.token]);

  if (allUsers === null)
    return (<div>Something is wrong with the server, check back later!</div>);
  else if (!allUsers.length)
    return (<div>No users yet!</div>);
  else
    return allUsers.map((current, index) => RankingCard(current, index + 1, user));
}

const Notifications = ({searchArr}) => {
  let ret = [];

  if (!searchArr)
    return '';

  if (searchArr.submissionSuccess)
    ret.push({
      text: 'Result submitted!',
      variant: 'success'
    });

  return ret.map((item, index) =>
    <Alert key={index} variant={item.variant}>{item.text}</Alert>
  );
};

const Index = () => {
  const history = useHistory();
  const user = useSelector(state => state.user);
  const [searchArr, setSearchArr] = useState(
    parseSearchString(window.location.search)
  );

  useEffect(() => {
    // This will make sure notifications aren't shown again if page is refreshed
    history.push('/');
    // Clear notifications after 5 seconds
    setTimeout(() => setSearchArr(null), 5000);
  }, [history]);

  return (
    <div>
      <Notifications searchArr={searchArr} />
      {user ? <LoggedIn user={user} /> : <NotLoggedIn />}
    </div>
  );
};

export default Index;
