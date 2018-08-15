import React from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { expireSession, unexpireSession } from '../_actions/session.action';
import ArtModal from './common/ModalComponent';


export class SessionExpiredComponent extends React.Component {
  state ={
    // open: false,
    // close: false
  }

  componentDidMount() {
    this.tokenValid();
  }

  componentDidUpdate() {
  // console.log('Component just updated');
    this.tokenValid();
  }

  tokenValid = () => {
    const now = Date.now();
    const token = jwt.decode(localStorage.getItem('art-prod-web-token'));
    const { exp: tokenExpiry } = token || {};
    // const tokenExpiry = localStorage.getItem('token-exp');
    const timeout = (tokenExpiry * 1000) - now;
    setTimeout(() => {
      this.props.expireSession();
    }, timeout);
  };

  handleLogout = () => {
    localStorage.removeItem('art-prod-web-token');
    this.props.unexpireSession();
    this.props.history.push('/');
  };

  // closeModal = () => {
  //   this.setState({
  //     close: true
  //   });
  // }

  render() {
    // console.log(this.props.sessionExpired, '<<==Expired');
    return (
      <div>
        { this.props.sessionExpired &&
        <ArtModal
          trigger={null}
          open={this.props.sessionExpired}
          onClose={this.props.unexpireSession}
          modalTitle="Session Expired"
        >
          <h3>Session Expired</h3>
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

// SessionExpiredComponent.defaultProps = {
//   // expireSession: () => {},
//   unexpireSession: () => {},
//   push: () => {
//   }
// };


export default withRouter(connect(mapStateToProps, {
  expireSession, unexpireSession
})(SessionExpiredComponent));
