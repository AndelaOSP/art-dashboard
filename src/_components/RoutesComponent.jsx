import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticateComponent from './AuthenticateComponent';
import AssetTypesComponent from '../components/AssetTypesComponent'
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
          <AuthenticateComponent
            exact
            isAuthenticated={this.state.isAuthenticated}
            path='/asset_types'
            component={AssetTypesComponent}
          />
          <Route path='/login' component={LoginComponent} />
          <Route path='/' component={LoginComponent} />
          <Route path='*' component={LoginComponent} />
        </Switch>
      </div>
    );
  }
};

export default (RoutesComponent);
