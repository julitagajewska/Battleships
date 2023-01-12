import React from 'react';
import './CenteredContainer.css';

export default function CenteredContainer(props) {
  return (
    <div className="centered-container">
      {props.children}
    </div>
  )
}
