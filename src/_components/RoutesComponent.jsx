import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Authenticate from './Authentication/AuthenticateComponent';
import AssetTypes from '../components/AssetTypesComponent';
import Assets from '../_components/Assets/AssetsContainer';
import AssetModels from '../components/AssetModels/AssetModelsComponent';
import LoginComponent from '../components/LoginComponent';
import Dashboard from '../_components/Dashboard/DashboardContainer';
import UserFeedback from '../components/User/UserFeedbackComponent';
import PageNotFound from '../components/PageNotFoundComponent';
import AssetSubCategories from '../components/AssetsSubCategoriesComponent';
import Allocations from '../components/AllocationsComponent';
import IncidenceReports from '../components/IncidenceReportsComponent';
import AssetCategories from '../components/AssetCategoriesComponent';
import AssetDetail from './AssetDetails/AssetDetailsContainer';
import AssetConditions from '../components/AssetCondition/AssetConditionsComponent';
import AssetMakes from '../components/AssetMake/AssetMakeComponent';
import User from './User/UserContainer';
import UserDetail from './User/UserDetailContainer';
import AssetSpecs from '../components/AssetSpecs/AssetSpecsComponent';
import AddAsset from './Assets/AddAssetContainer';
import AddAssetSpec from './AssetSpecs/AddAssetSpecContainer';

const RoutesComponent = () => (
  <Switch>
    <Route
      path="/dashboard"
      component={Authenticate(Dashboard)}
    />
    <Route
      exact
      path="/users"
      component={Authenticate(User)}
    />
    <Route
      exact
      path="/asset-types"
      component={Authenticate(AssetTypes)}
    />
    <Route
      exact
      path="/assets"
      component={Authenticate(Assets)}
    />
    <Route
      exact
      path="/asset-models"
      component={Authenticate(AssetModels)}
    />
    <Route
      exact
      path="/user-feedback"
      component={Authenticate(UserFeedback)}
    />
    <Route
      path="/assets/:id/view"
      component={Authenticate(AssetDetail)}
    />
    <Route
      path="/users/:id/view"
      component={Authenticate(UserDetail)}
    />
    <Route
      exact
      path="/allocations"
      component={Authenticate(Allocations)}
    />
    <Route
      exact
      path="/incidence-reports"
      component={Authenticate(IncidenceReports)}
    />
    <Route
      exact
      path="/asset-sub-categories"
      component={Authenticate(AssetSubCategories)}
    />
    <Route
      exact
      path="/asset-categories"
      component={Authenticate(AssetCategories)}
    />
    <Route
      exact
      path="/asset-conditions"
      component={Authenticate(AssetConditions)}
    />
    <Route
      exact
      path="/asset-makes"
      component={Authenticate(AssetMakes)}
    />
    <Route
      exact
      path="/asset-specs"
      component={Authenticate(AssetSpecs)}
    />
    <Route
      exact
      path="/asset-specs/create"
      component={Authenticate(AddAssetSpec)}
    />
    <Route
      exact
      path="/assets/create"
      component={Authenticate(AddAsset)}
    />
    <Route
      exact
      path="/"
      component={LoginComponent}
    />
    <Route
      path="*"
      component={PageNotFound}
    />
  </Switch>
);

export default (RoutesComponent);
