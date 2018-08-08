import React from 'react';
import Button from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ArtModal from './common/ModalComponent';

const useTimeouts = (SingleComponent) => {
  class TimeoutComponent extends React.Component {
    state = {
      timeouts: []
    }

    timeoutAlert = () => (
      <ArtModal
        modalTitle="Session Timeout Alert"
      >
        <p>Your Sign In session has timed out or is invalid. Please Sign In again.</p>
        <Button onClick={this.handleLogout}>
        Ok
        </Button>
      </ArtModal>
    )

    handleLogout = () => {
      localStorage.removeItem('art-prod-web-token');
      this.props.history.push('/');
    }

    addTimeout() {
      this.state.timeouts.push(setTimeout(this.timeoutAlert, 5000));
    }

    clearTimeouts() {
      this.state.timeouts.forEach(clearTimeout);
    }

    render() {
      return (
        <SingleComponent
          addTimeout={this.addTimeout}
          clearTimeouts={this.clearTimeouts}
          {...this.props}
        />
      );
    }
  }

  TimeoutComponent.propTypes = {
    history: PropTypes.object.isRequired,
    push: PropTypes.func
  };

  TimeoutComponent.defaultProps = {
    push: () => {
    }
  };

  return TimeoutComponent;
};

export default useTimeouts;
