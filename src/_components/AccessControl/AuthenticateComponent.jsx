import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';

import Authorize from './Authorize';

export const AuthenticateComponent = ({
  component: Component,
  isAuthenticated,
  isAdmin,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated
        ? <Authorize {...props} AuthComponent={Component} isAdmin={isAdmin} />
        : <Redirect to="/" />
    )}
  />
);

AuthenticateComponent.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool
};

export default withRouter(AuthenticateComponent);
