import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticateComponent from './AuthenticateComponent';
import AssetTypesComponent from '../components/AssetTypesComponent'
import LoginComponent from '../components/LoginComponent';
import DashboardComponent from '../components/DashboardComponent';
import AddAssetComponent from './AddAssetComponent';

class RoutesComponent extends React.Component {
  checkAuthentication = () => {
    return !!(localStorage.getItem('token'));
  }

  render () {
    return (
      <div>
        <Switch>
          <AuthenticateComponent
            isAuthenticated={this.checkAuthentication()}
            path='/dashboard'
            component={DashboardComponent}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path='/asset_types'
            component={AssetTypesComponent}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path='/asset/add'
            component={AddAssetComponent}
          />
          <Route exact path='/' component={LoginComponent} />
          <Route path='*' component={LoginComponent} />
        </Switch>
      </div>
    );
  }
};

export default (RoutesComponent);
