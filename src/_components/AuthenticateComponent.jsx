import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticateComponent = ({ component: Component, isAuthenticated, ...options }) => (
  <Route {...options} render={props => (
      isAuthenticated
          ? <Component {...props} />
          : <Redirect to='/' />
  )} />
)

export default AuthenticateComponent;
