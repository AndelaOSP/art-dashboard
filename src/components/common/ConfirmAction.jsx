import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ButtonComponent from './ButtonComponent';

export default class ConfirmAction extends React.Component {
  componentDidUpdate(prevProps) {
    const { buttonLoading, toggleModal } = this.props;
    if ((prevProps.buttonLoading !== buttonLoading) && !buttonLoading) {
      toggleModal();
    }
  }

  render() {
    return (
      <Fragment>
        <label>
          Are you sure you want to perform this action?
        </label>
        <br />
        <ButtonComponent
          className="cancel"
          buttonName="Cancel"
          handleClick={this.props.toggleModal}
        />
        <ButtonComponent
          className="save"
          buttonName="Save"
          color="primary"
          buttonState={this.props.buttonState}
          handleClick={this.props.handleConfirm}
        />
      </Fragment>
    );
  }
}

ConfirmAction.propTypes = {
  toggleModal: PropTypes.func,
  handleConfirm: PropTypes.func.isRequired,
  buttonState: PropTypes.bool.isRequired,
  buttonLoading: PropTypes.bool.isRequired
};
