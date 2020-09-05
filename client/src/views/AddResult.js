import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUsers } from '../reducers/allUsers';

const PlayerInput = ({player, setPlayer, label, name, users}) => {
  console.log(users)
  const changeValue = event => {
    setPlayer(event.target.value);
    console.log(users.filter(user => user.username.includes(player)));
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type='text' value={player} onChange={changeValue} />
    </>
  );
};

const AddResult = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const users = useSelector(state => state.allUsers);

  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  useEffect(() => {
    if (user) {
      setPlayer1(user.username);
      dispatch(fetchUsers(user.token));
    }
  }, [user, dispatch]);

  return (
    <form>
      <PlayerInput
        player={player1} setPlayer={setPlayer1}
        label='Player 1' name='player1' users={users}
      />
    </form>
  );
};

export default AddResult;
