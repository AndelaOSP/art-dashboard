import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginAction } from '../_actions/login.action';

import getToken from '../utils/getToken';

class LoginComponent extends React.Component {

  redirectToDashboard(props) {
    if (props.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  componentDidMount() {
    this.redirectToDashboard(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.redirectToDashboard(nextProps);
  }
  handleLogin = () => {
    const token = getToken();
    this.props.loginAction(token);
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    )
  }
};

const mapStateToProps = ({ loginReducer }) => {
  const { isAuthenticated } = loginReducer;
  return {
    isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps, {
  loginAction,
})(LoginComponent));