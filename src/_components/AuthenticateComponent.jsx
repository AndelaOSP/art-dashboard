import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticateComponent = ({ component: Component, ...options }) => (
  <Route {...options} render={props => (
      localStorage.getItem('andela_notification_values_tokens_1576::145440460')
          ? <Component {...props} />
          : <Redirect to='/' />
  )} />
)

export default AuthenticateComponent;
