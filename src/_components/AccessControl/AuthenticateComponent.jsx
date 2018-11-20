import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';

import Authorize from './Authorize';

export const AuthenticateComponent = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Authorize {...props} AuthComponent={Component} isAuthenticated={isAuthenticated} />
    )}
  />
);

AuthenticateComponent.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool
};

export default withRouter(AuthenticateComponent);
