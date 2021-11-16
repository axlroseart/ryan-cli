import React from 'react';
import './index.scss';
const logo = require('../../assets/images/logo.png').default;

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1>404 Not Found.</h1>
      <img src={logo} />
    </div>
  );
}

export default PageNotFound;
