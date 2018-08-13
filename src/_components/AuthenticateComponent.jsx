import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AuthenticateComponent = ({ component: Component, isAuthenticated, ...options }) => (
  <Route
    {...options}
    render={props => (
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )}
  />
);

AuthenticateComponent.propTypes = {
  location: PropTypes.string,
  component: PropTypes.element,
  isAuthenticated: PropTypes.bool
};

export default AuthenticateComponent;
