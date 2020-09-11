import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import getProfileData from '../services/profile';
import { useSelector } from 'react-redux';

import ProfileImage from '../components/ProfileImage';

import '../styles/Profile.css';

const GeneralProfileData = ({data}) => (
  <div className='flexRow noWrap generalProfile'>
    <ProfileImage url={data.imageurl} />
    <div className='flexCol noWrap'>
      <h3>{data.username}</h3>
      <div>Total matches played: <span className='bold'>{data.match_count}</span></div>
    </div>
  </div>
);

const SingleMatch = ({match, username}) => {
  const playerWon = match.winner_username === username ? true : false;
  const playerScore = !playerWon ? match.loser_score : match.winner_score;
  const otherUsername = playerWon ?
    match.loser_username : match.winner_username;
  const otherId = playerWon ? match.loser_id : match.winner_id;
  const otherScore = playerWon ? match.loser_score : match.winner_score;

  const resultClass = match.draw ? 'matchDraw' :
    playerWon ? 'matchWin' : 'matchLoss';

  const localDate = new Date(match.time).toLocaleDateString();

  return (
    <div className={`singleMatchResult row ${resultClass}`}>
      <div className='col-3 col-md-2'>{localDate}</div>
      <div className='col-3 col-md-2'>{username}</div>
      <div className='bold col-3 col-md-2'>{playerScore} - {otherScore}</div>
      <div className='col-3 col-md-2'><Link to={`/users/${otherId}`}>{otherUsername}</Link></div>
    </div>
  );
};

const MatchList = ({matches, username}) => {
  const possessive = 'sx'.includes(username[-1]) ? '\'' : '\'s';

  if (!matches.length)
    return (<div>{username} hasn't played any matches yet!</div>);
  else
    return (
      <div>
        <div>{username}{possessive} last {matches.length} matches:</div>
        {matches.map(
          (match, index) => <SingleMatch
            match={match} username={username} key={index}
          />
        )}
      </div>
    );
};

const Profile = () => {
  const {id} = useParams();
  const user = useSelector(state => state.user);
  const [currentProfile, setCurrentProfile] = useState('Loading');

  useEffect(() => {
    if (user) {
      getProfileData(id, user)
        .then(res => setCurrentProfile(res));
    }
    else
      setCurrentProfile('You must log in to view profiles.');
  }, [id, user]);

  if (typeof currentProfile === 'string')
    return (<div>{currentProfile}</div>);
  else
    return (
      <>
        <GeneralProfileData data={currentProfile.user} />
        <MatchList
          matches={currentProfile.matches}
          username={currentProfile.user.username}
        />
      </>
    );
};

export default Profile;
