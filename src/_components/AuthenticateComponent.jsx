import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticateComponent = ({ component: Component, ...options }) => (
  <Route {...options} render={props => (
      localStorage.getItem('token')
          ? <Component {...props} />
          : <Redirect to='/' />
  )} />
)

export default AuthenticateComponent;
