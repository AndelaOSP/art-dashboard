import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticateComponent from './AuthenticateComponent';
import AssetTypesComponent from '../components/AssetTypesComponent';
import AssetsComponent from '../components/AssetsComponent';
import LoginComponent from '../components/LoginComponent';
import DashboardComponent from '../components/DashboardComponent';
import FeedbackComponent from '../components/FeedbackComponent';
import AddAssetContainer from './AddAsset/AddAssetContainer';

class RoutesComponent extends React.Component {
  checkAuthentication = () => !!(localStorage.getItem('art-prod-web-token'))
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
            component={AssetTypesComponent}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/assets"
            component={AssetsComponent}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/feedback"
            component={FeedbackComponent}
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
