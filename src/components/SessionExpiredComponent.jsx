import React from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { expireSession, unexpireSession } from '../_actions/session.action';
import ArtModal from './common/ModalComponent';


export class SessionExpiredComponent extends React.Component {
  componentDidMount() {
    this.tokenValid();
  }

  componentDidUpdate() {
    this.tokenValid();
  }

  tokenValid = () => {
    const now = Date.now();
    const jwToken = localStorage.getItem('art-prod-web-token');
    if (jwToken) {
      const token = jwt.decode(jwToken);
      const { exp: tokenExpiry } = token || {};
      if (now >= tokenExpiry * 1000) {
        this.props.expireSession();
      }
    }
  };

  handleLogout = () => {
    localStorage.removeItem('art-prod-web-token');
    this.props.unexpireSession();
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        { this.props.sessionExpired &&
        <ArtModal
          trigger={null}
          open
          onClose={this.handleLogout}
          modalTitle="Session Expired"
          closeIcon={false}
          closeOnEscape={false}
          closeOnDimmerClick={false}
        >
          <p>Your Sign In session has timed out. Please Sign In again.</p>
          <Button onClick={this.handleLogout}>OK</Button>
        </ArtModal>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ session: { sessionExpired } }) => ({ sessionExpired });

SessionExpiredComponent.propTypes = {
  expireSession: PropTypes.func,
  unexpireSession: PropTypes.func,
  sessionExpired: PropTypes.bool,
  history: PropTypes.object.isRequired,
  push: PropTypes.func
};

SessionExpiredComponent.defaultProps = {
  push: () => {
  }
};


export default withRouter(connect(mapStateToProps, {
  expireSession, unexpireSession
})(SessionExpiredComponent));
