import React from 'react';

import config from '../utils/config.js';

const ProfileImage = ({url}) => {
  const urlOrPlaceholder = url || config.imagePlaceholderUrl;
  return (
    <img
      src={urlOrPlaceholder}
      onError={e => e.target.src = config.imagePlaceholderUrl}
      className='profileImage' alt='User profile'
    />);
};

export default ProfileImage;
