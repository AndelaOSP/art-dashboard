import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticateComponent = ({ component: Component, isAuthenticated, ...options }) => {
  return (
    <Route {...options} render={props => (
        isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
  )
};

export default AuthenticateComponent;
