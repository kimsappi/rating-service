import React from 'react';
import { Link } from 'react-router-dom';

const style = {
  position: 'fixed',
  right: '10px',
  bottom: '10px',
  borderRadius: '50%',
  fontSize: '2em',
  fontWeight: 'bold',
  backgroundColor: 'dodgerblue',
  color: 'whitesmoke',
  height: '40px',
  width: '40px',
  textAlign: 'center',
  textShadow: '0 0 10px whitesmoke'
}

const innerStyle = {
  position: 'absolute',
  top: '-6px',
  left: '10px'
}

const AddResultFixedButton = () => (
  <Link to='/new'>
    <div style={style} variant='primary' id='addResultFixedButton'>
      <div style={innerStyle}>+
      </div>
    </div>
  </Link>
);

export default AddResultFixedButton;
