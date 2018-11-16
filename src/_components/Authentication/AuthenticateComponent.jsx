import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { has } from 'lodash';
import { Button } from 'semantic-ui-react';

import ArtModal from '../../components/common/ModalComponent';

export class AuthenticateComponent extends React.Component {
  checkAdmin = () => {
    const token = localStorage.getItem('art-prod-web-token');

    if (!token) {
      return false;
    }

    const decodedToken = jwt.decode(token);

    if (!has(decodedToken, 'admin')) {
      return false;
    }

    return decodedToken.admin;
  };

  handleLogout = () => {
    localStorage.removeItem('art-prod-web-token');
    this.props.history.push('/');
  };

  render() {
    return (
      <div {...this.props} />
    );
  }
}

AuthenticateComponent.propTypes = {
  history: PropTypes.object,
  push: PropTypes.func
};

AuthenticateComponent.defaultProps = {
  history: {},
  push: () => {}
};

export default (ProtectedComponent) => {
  class AuthHOC extends AuthenticateComponent {
    render() {
      if (!this.checkAdmin()) {
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

      return (
        <ProtectedComponent
          {...this.props}
          isAdmin={this.checkAdmin()}
        />
      );
    }
  }

  return withRouter(AuthHOC);
};
