import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddUserComponent from '../../components/User/AddSecurityUserComponent';
import { ToastMessage } from '../../_utils/ToastMessage';
import { addSecurityUser } from '../../_actions/users.actions';
import resetToastMessageContent from '../../_actions/toastMessage.actions';
import emailValidation from '../../_utils/formValidation';

class AddSecurityUserContainer extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    badgeNumber: '',
    email: '',
    saveButtonState: false,
    error: false
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

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onChangeButtonState = () => {
    if (this.state.badgeNumber && this.state.email) {
      this.setState({ error: !emailValidation(this.state.email) }, () => {
        if (!this.state.error) {
          this.setState({ saveButtonState: !this.state.saveButtonState });
        }
      });
    }
  };

  handleSubmit = (event) => {
    if (!this.state.error) {
      const newSecurityUser = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        phone_number: this.state.phoneNumber,
        email: this.state.email,
        badge_number: this.state.badgeNumber
      };
      this.props.addSecurityUser(newSecurityUser);
      if (!this.state.saveButtonState) {
        event.target.reset();
      }
    }
  };

  render() {
    return (
      <AddUserComponent
        {...this.props}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        buttonState={this.state.saveButtonState}
        onChangeButtonState={this.onChangeButtonState}
        error={this.state.error}
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
