import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import { fetchUsers } from '../reducers/allUsers';

import '../styles/AddResult.css';
import { sendScore } from '../services/scores';

const PlayerInput = ({player, setPlayer, label, name, users}) => {
  const [matchingUsers, setMatchingUsers] = useState([]);

  const changeValue = (_event, { newValue }) => {
    setPlayer(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setMatchingUsers(users.filter(user => {
      if (user.username.includes(value))
        return user.username;
      else
        return false;
    }));
    return matchingUsers;
  };

  const getSuggestionValue = suggestion => {
    return suggestion.username;
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
    pattern: '.{1,20}',
    required: true
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
      else if (scoreInt + change < 0)
        setScore(0);
      else if (scoreInt + change > 9999)
        setScore(9999);
    } catch(err) {}
  };

  return (
    <>
      <label htmlFor={name}>{label} score</label>
      <button onClick={event => buttonHandler(-5, event)}
        className='scoreButton decrease'
      >-5</button>
      <button onClick={event => buttonHandler(-1, event)}
        className='scoreButton decrease'
      >-1</button>
      <input
        type='text' pattern='[0-9]{1,4}' name={name}
        value={score} onChange={changeHandler} required={true}
        className='scoreInput'
      />
      <button onClick={event => buttonHandler(1, event)}
        className='scoreButton increase'
      >+1</button>
      <button onClick={event => buttonHandler(5, event)}
        className='scoreButton increase'
      >+5</button>
    </>
  );
};

const AddResult = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.user);
  const users = useSelector(state => state.allUsers);

  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  useEffect(() => {
    if (user) {
      setPlayer1(user.username);
      dispatch(fetchUsers(user.token, true));
    }
  }, [user, dispatch]);

  const submitScore = async event => {
    event.preventDefault();
    if (player1 !== player2 && score1 + score2 > 0) {
      if (window.confirm(`Submit result:
${player1} ${score1} - ${score2} ${player2}?`)) {
        const response = await sendScore(player1, player2, score1, score2, user);
        if (response)
          history.push('/?submissionSuccess=1');
      }
    }
    else
      alert('You can\'t play against yourself and there must be a score!');
  };

  return (
    <>
      <Alert variant='primary'>Inactive users aren't suggested automatically, just enter their login!</Alert>
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
    </>
  );
};

export default AddResult;
