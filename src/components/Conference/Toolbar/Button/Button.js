import React from 'react';

import './Button.css'

function Button (props) {
  const className = ['Button', props.selected ? 'selected' : ''].filter(Boolean).join(' ')

  return <button className={className} onClick={props.onClick}>
    {props.icon}
  </button>;
}

export default Button;
