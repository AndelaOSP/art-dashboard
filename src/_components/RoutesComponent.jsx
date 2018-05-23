import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticateComponent from './AuthenticateComponent';
import LoginComponent from '../components/LoginComponent';
import DashboardComponent from '../components/DashboardComponent';

class RoutesComponent extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          <AuthenticateComponent
            path='/dashboard'
            component={DashboardComponent}
          />
          <Route path='/' component={LoginComponent} />
          <Route path='*' component={LoginComponent} />
        </Switch>
      </div>
    );
  }
};

export default (RoutesComponent);
