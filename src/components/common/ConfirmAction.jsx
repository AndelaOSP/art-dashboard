import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ButtonComponent from './ButtonComponent';

export default class ConfirmAction extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { buttonLoading, toggleModal } = nextProps;
    if (!buttonLoading) toggleModal();
    return true;
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
  toggleModal: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  buttonState: PropTypes.bool.isRequired
};
