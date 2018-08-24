import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddUserComponent from '../../components/User/AddSecurityUserComponent';
import { ToastMessage } from '../../_utils/ToastMessage';
import { addSecurityUser } from '../../_actions/users.actions';
import resetToastMessageContent from '../../_actions/toastMessage.actions';

class AddSecurityUserContainer extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    badgeNumber: '',
    email: '',
    saveButtonState: false
  };

  static getDerivedStateFromProps(nextProps) {
    const { toastMessageContent } = nextProps;
    if (toastMessageContent.type) {
      if (toastMessageContent.type === 'success') {
        ToastMessage.success({
          message: toastMessageContent.message
        });
      } else if (toastMessageContent.type === 'error') {
        ToastMessage.error({
          message: toastMessageContent.message
        });
      }
      nextProps.resetToastMessageContent();
      nextProps.toggleModal();
      return {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        badgeNumber: '',
        email: ''
      };
    }
    return null;
  }

  onFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
  };

  onLastNameChange = (event) => {
    this.setState({ lastName: event.target.value });
  };

  onPhoneNumberChange = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onBadgeNumberChange = (event) => {
    this.setState({ badgeNumber: event.target.value });
  };

  onChangeButtonState = () => {
    this.setState({ saveButtonState: !this.state.saveButtonState });
  };

  handleSubmit = (event) => {
    const newSecurityUser = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      phone_number: this.state.phoneNumber,
      email: this.state.email,
      badge_number: this.state.badgeNumber
    };

    this.props.addSecurityUser(newSecurityUser);
    event.target.reset();
  };

  render() {
    return (
      <AddUserComponent
        {...this.props}
        handleSubmit={this.handleSubmit}
        onFirstNameChange={this.onFirstNameChange}
        onLastNameChange={this.onLastNameChange}
        onPhoneNumberChange={this.onPhoneNumberChange}
        onBadgeNumberChange={this.onBadgeNumberChange}
        onEmailChange={this.onEmailChange}
        buttonState={this.state.saveButtonState}
        onChangeButtonState={this.onChangeButtonState}
      />
    );
  }
}

AddSecurityUserContainer.propTypes = {
  addSecurityUser: PropTypes.func.isRequired,
  toastMessageContent: PropTypes.object,
  resetToastMessageContent: PropTypes.func
};


const mapStateToProps = ({ usersList, toastMessage }) => ({
  securityUser: usersList.securityUser,
  toastMessageContent: toastMessage
});

export default connect(mapStateToProps, {
  addSecurityUser,
  resetToastMessageContent
})(AddSecurityUserContainer);
