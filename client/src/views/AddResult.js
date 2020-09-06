import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Autosuggest from 'react-autosuggest';

import { fetchUsers } from '../reducers/allUsers';

import '../styles/AddResult.css';

const PlayerInput = ({player, setPlayer, label, name, users}) => {
  const [matchingUsers, setMatchingUsers] = useState([]);

  const changeValue = (_event, { newValue }) => {
    setPlayer(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setMatchingUsers(users.filter(user => {
      if (user.username.includes(value))
        return user.username;
    }));
    return matchingUsers;
  };

  const getSuggestionValue = suggestion => {
    return suggestion;
  };

  const renderSuggestion = suggestion => {
    return (
      <div>{suggestion.username}</div>
    )};

  const clearSuggestions = () => {
    setMatchingUsers([]);
  };

  const inputProps = {
    value: player,
    onChange: changeValue,
    pattern: '.{1,20}'
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Autosuggest
        suggestions={matchingUsers}
        inputProps={inputProps}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={clearSuggestions}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
      />
    </>
  );
};

const ScoreInput = ({score, setScore, label, name}) => {
  const changeHandler = event => {
    try {
      const scoreInt = parseInt(event.target.value);
      if (event.target.checkValidity())
        setScore(scoreInt || 0);
    } catch(err) {}
  };

  const buttonHandler = (change, event) => {
    event.preventDefault();
    try {
      const scoreInt = parseInt(score);
      if (scoreInt + change >= 0 && scoreInt + change <= 9999)
        setScore(scoreInt + change);
    } catch(err) {}
  };

  return (
    <>
      <label htmlFor={name}>{label} score</label>
      <button onClick={event => buttonHandler(-1, event)}>-1</button>
      <input
        type='text' pattern='[0-9]{1,4}' name={name}
        value={score} onChange={changeHandler}
      />
      <button onClick={event => buttonHandler(1, event)}>+1</button>
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

  const submitScore = event => {
    event.preventDefault();
    
  };

  return (
    <form onSubmit={submitScore}>
      <PlayerInput
        player={player1} setPlayer={setPlayer1}
        label='Player 1' name='player1' users={users}
      />
      <ScoreInput
        score={score1} setScore={setScore1}
        label='Player 1' name='score1'
      />
      <PlayerInput
        player={player2} setPlayer={setPlayer2}
        label='Player 2' name='player2' users={users}
      />
      <ScoreInput
        score={score2} setScore={setScore2}
        label='Player 2' name='score2'
      />
      <input type='submit' name='submit' value='OK' />
    </form>
  );
};

export default AddResult;
