import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticateComponent from './AuthenticateComponent';
import AssetTypes from '../components/AssetTypesComponent';
import Assets from '../components/AssetsComponent';
import AssetModels from '../components/AssetModels/AssetModelsComponent';
import LoginComponent from '../components/LoginComponent';
import DashboardComponent from '../components/DashboardComponent';
import UserFeedback from '../components/UserFeedbackComponent';
import AddAssetContainer from './AddAsset/AddAssetContainer';
import PageNotFoundComponent from '../components/PageNotFoundComponent';
import AssetSubCategories from '../components/AssetsSubCategoriesComponent';
import Allocations from '../components/AllocationsComponent';
import IncidenceReports from '../components/IncidenceReportsComponent';
import AssetCategories from '../components/AssetCategoriesComponent';
import AssetDetailComponent from '../components/AssetDetailComponent';

class RoutesComponent extends Component {
  checkAuthentication = () => !!(localStorage.getItem('art-prod-web-token'));

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
            path="/asset_models"
            component={AssetModels}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/user-feedback"
            component={UserFeedback}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/assets/add"
            component={AddAssetContainer}
          />
          <AuthenticateComponent
            isAuthenticated={this.checkAuthentication()}
            path="/assets/:id/view"
            component={AssetDetailComponent}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/allocations"
            component={Allocations}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/incidence-reports"
            component={IncidenceReports}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset-sub-categories"
            component={AssetSubCategories}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset-categories"
            component={AssetCategories}
          />
          <Route exact path="/" component={LoginComponent} />
          <Route path="*" component={PageNotFoundComponent} />
        </Switch>
      </div>
    );
  }
}

export default (RoutesComponent);
