import React from 'react';

import { imagePlaceholderUrl } from '../config.json';

const ProfileImage = ({url}) => {
  const urlOrPlaceholder = url || imagePlaceholderUrl;
  return (
    <img
      src={urlOrPlaceholder} onError={e => e.target.src = imagePlaceholderUrl}
      className='profileImage' alt='User profile'
    />);
};

export default ProfileImage;
