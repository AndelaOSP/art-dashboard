import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginAction } from '../_actions/login.action';

import AuthenticateComponent from './AuthenticateComponent';
import AssetTypesComponent from '../components/AssetTypesComponent'
import LoginComponent from '../components/LoginComponent';
import DashboardComponent from '../components/DashboardComponent';

import LocalStorageUtil from '../_utils/LocalStorageUtil';

class RoutesComponent extends React.Component {
  state = {
    isAuthenticated: false,
  }

  componentWillMount() {
    this.props.loginAction(LocalStorageUtil.get('token'), LocalStorageUtil);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isAuthenticated) {
      this.setState({
        isAuthenticated: true,
      });
    }
  }
  render () {
    return (
      <div>
        <Switch>
          <AuthenticateComponent
            exact
            isAuthenticated={this.state.isAuthenticated}
            path='/'
            component={DashboardComponent}
          />
          <AuthenticateComponent
            exact
            isAuthenticated={this.state.isAuthenticated}
            path='/asset_types'
            component={AssetTypesComponent}
          />
          <Route path='/login' component={LoginComponent} />
        </Switch>
      </div>
    );
  }
};

const mapStateToProps = ({ loginReducer }) => {
  const { isAuthenticated } = loginReducer;
  return {
    isAuthenticated,
  }
};

const mapDispatchToProps = {
  loginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesComponent);
