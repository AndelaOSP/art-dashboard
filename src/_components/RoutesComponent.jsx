import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticateComponent from './AuthenticateComponent';
import AssetTypes from '../components/AssetTypesComponent';
import Assets from '../components/AssetsComponent';
import LoginComponent from '../components/LoginComponent';
import DashboardComponent from '../components/DashboardComponent';
import Feedback from '../components/FeedbackComponent';
import AddAssetContainer from './AddAsset/AddAssetContainer';

class RoutesComponent extends React.Component {
  checkAuthentication = () => !!(localStorage.getItem('token'))
  render() {
    return (
      <div>
        <Switch>
          <AuthenticateComponent
            isAuthenticated={this.checkAuthentication()}
            path="/dashboard"
            component={DashboardComponent}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset_types"
            component={AssetTypes}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/assets"
            component={Assets}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/feedback"
            component={Feedback}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/assets/add"
            component={AddAssetContainer}
          />
          <Route exact path="/" component={LoginComponent} />
          <Route path="*" component={LoginComponent} />
        </Switch>
      </div>
    );
  }
}

export default (RoutesComponent);
