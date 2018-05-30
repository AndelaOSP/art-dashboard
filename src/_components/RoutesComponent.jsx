import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticateComponent from './AuthenticateComponent';
import AssetTypesComponent from '../components/AssetTypesComponent'
import LoginComponent from '../components/LoginComponent';
import DashboardComponent from '../components/DashboardComponent';

class RoutesComponent extends React.Component {
  checkAuthentication = () => {
    return !!(localStorage.getItem('token'));
  }
  render () {
    return (
      <div>
        <Switch>
          <AuthenticateComponent
            path='/dashboard'
            isAuthenticated={this.checkAuthentication()}
            component={DashboardComponent}
          />
          <AuthenticateComponent
            path='/asset_types'
            isAuthenticated={this.checkAuthentication()}
            component={AssetTypesComponent}
          />
          <Route exact path='/' component={LoginComponent} />
          <Route path='*' component={LoginComponent} />
        </Switch>
      </div>
    );
  }
};

export default (RoutesComponent);
