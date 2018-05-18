import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginAction } from '../_actions/login.action';

class LoginComponent extends React.Component {

  goToDashboard() {
    this.props.history.push('/');
  }
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.goToDashboard();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.goToDashboard();
    } 
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={() => this.props.loginAction('token')}>Login</button>
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