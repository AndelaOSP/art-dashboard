import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticateComponent from './AuthenticateComponent';
import LoginComponent from '../components/LoginComponent';
import DashboardComponent from '../components/DashboardComponent';

import getToken from '../_utils/getToken';

class RoutesComponent extends React.Component {
  state = {
    isAuthenticated: false,
  }

  componentWillMount() {
    if(getToken()) {
      this.setState({
        isAuthenticated: true
      })
    }
  }

  render () {
    return (
      <div>
        <Switch>
          <AuthenticateComponent
            isAuthenticated={this.state.isAuthenticated}
            path='/dashboard'
            component={DashboardComponent}
          />
          <Route path='/' component={LoginComponent} />
          <Route path='*' component={LoginComponent} />
        </Switch>
      </div>
    );
  }
};

export default (RoutesComponent);
