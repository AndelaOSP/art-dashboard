import React from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { Button } from 'semantic-ui-react';
import checkPropertyExists from '../../_utils/checkPropertyExists';
import ArtModal from '../common/ModalComponent';

export class AdminVerificationComponent extends React.Component {
  componentDidMount() {
    this.checkAdmin();
  }

  componentDidUpdate() {
    this.checkAdmin();
  }

  checkAdmin = () => {
    const token = localStorage.getItem('art-prod-web-token');

    if (token) {
      const decodedToken = jwt.decode(token);

      this.props.updateAdminStatus(checkPropertyExists(decodedToken || {}, 'admin'));
    }
  };

  handleLogout = () => {
    localStorage.removeItem('art-prod-web-token');
    this.props.updateAdminStatus(false);
    this.props.history.push('/');
  };

  render() {
    const token = localStorage.getItem('art-prod-web-token');

    return (
      <div>
        {token && !this.props.isAdmin && (
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
        )}
      </div>
    );
  }
}

AdminVerificationComponent.propTypes = {
  updateAdminStatus: PropTypes.func,
  isAdmin: PropTypes.bool,
  history: PropTypes.object.isRequired,
  push: PropTypes.func
};

AdminVerificationComponent.defaultProps = {
  updateAdminStatus: () => {},
  push: () => {}
};

export default AdminVerificationComponent;
