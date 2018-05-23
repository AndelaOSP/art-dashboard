import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticateComponent = ({ component: Component, ...options }) => {
  const token = localStorage.getItem('token');
  return (
    <Route {...options} render={props => (
        token
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
  )
};

export default AuthenticateComponent;
