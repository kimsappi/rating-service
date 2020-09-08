import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import getProfileData from '../services/profile';
import { useSelector } from 'react-redux';

const GeneralProfileData = ({data}) => (
  <div>
    <div>{data.username}</div>
    <div>Matches played: {data.match_count}</div>
  </div>
);

const SingleMatch = ({match, index, username}) => {
  const playerFirst = match.winner_username === username ? true : false;
  const playerScore = !playerFirst ? match.loser_score : match.winner_score;
  const otherUsername = playerFirst ?
    match.loser_username : match.winner_username;
  const otherId = playerFirst ? match.loser_id : match.winner_id;
  const otherScore = playerFirst ? match.loser_score : match.winner_score;


  return (
    <div>
      {username} {playerScore} - {otherScore} <Link to={'/users/' + otherId}>{otherUsername}</Link>
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
            match={match} index={index} username={username}
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
