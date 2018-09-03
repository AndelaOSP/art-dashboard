import React from 'react';
import PropTypes from 'prop-types';
import ButtonComponent from './ButtonComponent';

class ConfirmAction extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { hasError, buttonLoading } = nextProps;
    if (!buttonLoading && !hasError) {
      nextProps.toggleModal();
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <label>
          Are you sure you want to perform this action?
        </label>
        <br />
        <ButtonComponent
          className="cancel"
          buttonName="Cancel"
          handleClick={this.props.toggleModal}
        />
        {console.log('this.props.loading', this.props.buttonState)}
        <ButtonComponent
          className="save"
          buttonName="Save"
          color="primary"
          buttonState={this.props.buttonState}
          handleClick={this.props.handleConfirm}
        />
      </div>
    );
  }
}

ConfirmAction.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  buttonState: PropTypes.bool.isRequired
};

export default ConfirmAction;
