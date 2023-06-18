import React from 'react';
import PropTypes from 'prop-types';
import './CenteredContainer.css';

function CenteredContainer(props) {
  return (
    <div className="centered-container">
      {props.children}
    </div>
  )
}

CenteredContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node]),
}

export default CenteredContainer
