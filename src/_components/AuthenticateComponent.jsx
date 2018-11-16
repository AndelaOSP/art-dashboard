import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import ArtModal from '../components/common/ModalComponent';

export const AuthenticateComponent = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated
        ? <Authorized {...props} />
        : <Redirect to="/" />
    )}
  />
);

AuthenticateComponent.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

AuthenticateComponent.defaultProps = {
  isAuthenticated: false
};

export class Authorized extends React.Component {
  handleLogout = () => {
    localStorage.removeItem('art-prod-web-token');
    this.props.history.push('/');
  };

  render() {
    const { isAdmin, component: Component } = this.props;
    if (isAdmin) {
      return <Component {...this.props} />;
    }

    return (
      <div className="app background">
        <ArtModal
          open
          onClose
          modalTitle="Unauthorized Access"
          closeIcon={false}
          closeOnEscape={false}
          closeOnDimmerClick={false}
        >
          <div>
            <p>
              Only users with admin privileges can access this site.
            </p>
            <Button onClick={this.handleLogout}>OK</Button>
          </div>
        </ArtModal>
      </div>
    );
  }
}

Authorized.propTypes = {
  history: PropTypes.object,
  push: PropTypes.func,
  component: PropTypes.func,
  isAdmin: PropTypes.bool
};

Authorized.defaultProps = {
  push: () => {},
  isAdmin: false
};

export default withRouter(AuthenticateComponent);
