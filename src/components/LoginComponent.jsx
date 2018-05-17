import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginAction } from '../_actions/login.action';

class LoginComponent extends React.Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/');
    } 
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={this.props.loginAction}>Login</button>
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