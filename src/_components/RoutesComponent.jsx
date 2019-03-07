import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { get } from 'lodash';

import Authenticate from './AccessControl/AuthenticateComponent';
import AssetTypes from '../components/AssetTypes/AssetTypesComponent';
import Assets from '../components/Assets/AssetsTabComponent';
import AssetModels from '../components/AssetModels/AssetModelsComponent';
import LoginComponent from '../components/LoginComponent';
import Dashboard from '../_components/Dashboard/DashboardContainer';
import UserFeedback from '../components/User/UserFeedbackComponent';
import PageNotFound from '../components/PageNotFoundComponent';
import AssetSubCategories from '../components/SubCategory/AssetsSubCategoriesComponent';
import Allocations from '../components/AllocationsComponent';
import IncidenceReports from '../components/IncidenceReportsComponent';
import AssetCategories from './Category/AssetCategoryContainer';
import AssetDetail from './AssetDetails/AssetDetailsContainer';
import AssetConditions from '../components/AssetCondition/AssetConditionsComponent';
import AssetMakes from '../components/AssetMake/AssetMakeComponent';
import User from '../components/User/UsersTabComponent';
import UserDetail from './User/UserDetailContainer';
import AssetSpecs from '../components/AssetSpecs/AssetSpecsComponent';
import AddAsset from './Assets/AddAssetContainer';
import AddAssetSpec from './AssetSpecs/AddAssetSpecContainer';
import SecurityUsers from './SecurityUser/SecurityUserContainer';
import AndelaCentresComponent from './AndelaCentres/AndelaCentresContainer';
import AssetLogs from '../components/AssetLogs/AssetLogComponent';

class RoutesComponent extends Component {
  checkAuthentication = () => {
    const token = localStorage.getItem('art-prod-web-token');

    if (!token) {
      return false;
    }

    const decodedToken = jwt.decode(token);

    return get(decodedToken, 'admin', false);
  };

  render() {
    return (
      <div>
        <Switch>
          <Authenticate
            isAuthenticated={this.checkAuthentication()}
            path="/dashboard"
            component={Dashboard}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/users"
            component={User}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset-types"
            component={AssetTypes}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/assets/create"
            component={AddAsset}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/assets/:status?"
            component={Assets}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset-models"
            component={AssetModels}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/user-feedback"
            component={UserFeedback}
          />
          <Authenticate
            isAuthenticated={this.checkAuthentication()}
            path="/assets/:id/view"
            component={AssetDetail}
          />
          <Authenticate
            isAuthenticated={this.checkAuthentication()}
            path="/users/:id/view"
            component={UserDetail}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/allocations"
            component={Allocations}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/incidence-reports"
            component={IncidenceReports}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset-sub-categories"
            component={AssetSubCategories}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset-categories"
            component={AssetCategories}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset-conditions"
            component={AssetConditions}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset-makes"
            component={AssetMakes}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset-specs"
            component={AssetSpecs}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset-specs/create"
            component={AddAssetSpec}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/security-users"
            component={SecurityUsers}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/andela-centres"
            component={AndelaCentresComponent}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset-logs"
            component={AssetLogs}
          />
          <Route exact path="/" component={LoginComponent} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default (RoutesComponent);
