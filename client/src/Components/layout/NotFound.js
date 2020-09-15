import React from 'react';
import PropTypes from 'prop-types';

const NotFound = (props) => {
  return (
    <>
      <h1 className='x-large text-primary'>
        <i className='fas -fa-exclamation-triangle'></i> Page not found
      </h1>
      <p>Page does not exist</p>
    </>
  );
};

NotFound.propTypes = {};

export default NotFound;
