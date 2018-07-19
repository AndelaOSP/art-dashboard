import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Authenticate from './AuthenticateComponent';
import AssetTypes from '../components/AssetTypesComponent';
import Assets from '../components/AssetsComponent';
import AssetModels from '../components/AssetModels/AssetModelsComponent';
import LoginComponent from '../components/LoginComponent';
import Dashboard from '../components/DashboardComponent';
import UserFeedback from '../components/UserFeedbackComponent';
import PageNotFound from '../components/PageNotFoundComponent';
import AssetSubCategories from '../components/AssetsSubCategoriesComponent';
import Allocations from '../components/AllocationsComponent';
import IncidenceReports from '../components/IncidenceReportsComponent';
import AssetCategories from '../components/AssetCategoriesComponent';
import AssetDetail from '../components/AssetDetailComponent';
import AssetConditions from '../components/AssetCondition/AssetConditionsComponent';
import AssetMakes from '../components/AssetMake/AssetMakeComponent';
import UserContainer from '../components/UserDetailsContainer';
import AssetSpecs from '../components/AssetSpecs/AssetSpecsComponent';

class RoutesComponent extends Component {
  checkAuthentication = () => !!(localStorage.getItem('art-prod-web-token'));

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
            component={UserContainer}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset_types"
            component={AssetTypes}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/assets"
            component={Assets}
          />
          <Authenticate
            exact
            isAuthenticated={this.checkAuthentication()}
            path="/asset_models"
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
          <Route exact path="/" component={LoginComponent} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default (RoutesComponent);
