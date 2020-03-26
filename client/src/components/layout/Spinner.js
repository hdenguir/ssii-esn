import React from 'react';
import spinner from '../../img/spinner.gif';

export default () => (
  <>
    <img
      src={spinner}
      style={{
        width: '200px',
        display: 'block',
        position: 'fixed',
        top: '50%',
        left: '50%',
        zIndex: '999',
        margin: '-100px 0 0 -100px',
      }}
      alt="Loading ... "
    />
  </>
);
