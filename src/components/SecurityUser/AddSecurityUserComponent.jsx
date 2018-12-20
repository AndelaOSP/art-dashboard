import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';

import emailValidation from '../../_utils/formValidation';

import ArtButton from '../common/ButtonComponent';
import StatusComponent from '../common/StatusComponent';

class AddSecurityUserComponent extends Component {
  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    badgeNumber: '',
    email: '',
    emailError: false
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!emailValidation(this.state.email)) {
      this.setState({ emailError: true });
    } else {
      this.setState({ emailError: false });

      const newSecurityUser = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        phone_number: this.state.phoneNumber,
        email: this.state.email,
        badge_number: this.state.badgeNumber
      };

      this.props.addSecurityUser(newSecurityUser);
    }
  };

  render() {
    const { firstName, lastName, phoneNumber, badgeNumber, email, emailError } = this.state;
    const { successMessage, errorMessage, isLoading } = this.props;

    const showStatus = successMessage || errorMessage;

    return (
      <React.Fragment>
        {showStatus && (
          <StatusComponent
            message={successMessage || errorMessage}
            className={successMessage ? 'success-status' : 'error-status'}
            reset={this.props.resetMessage}
          />
        )}

        <Form onSubmit={this.handleSubmit} error>
          <Form.Input
            label="First Name"
            id="first-name"
            name="firstName"
            placeholder="Enter First Name"
            value={firstName}
            onChange={this.handleInputChange}
            required
          />

          <Form.Input
            label="Last Name"
            id="last-name"
            name="lastName"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={this.handleInputChange}
            required
          />

          <Form.Input
            label="Email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={this.handleInputChange}
            required
          />

          {emailError && (
            <Message
              error
              content="The email you provided is not valid."
            />
          )}

          <Form.Input
            label="Badge Number"
            id="badge-number"
            name="badgeNumber"
            placeholder="Enter Badge Number"
            value={badgeNumber}
            onChange={this.handleInputChange}
            required
          />

          <Form.Input
            label="Phone Number"
            id="phone-number"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={this.handleInputChange}
          />

          <div className="modal__buttons">
            <ArtButton
              customCss="cancel"
              buttonName="Cancel"
              handleClick={this.props.toggleModal}
            />

            <ArtButton
              customCss="save"
              buttonName="Save"
              color="primary"
              handleClick={this.handleSubmit}
              buttonState={isLoading}
            />
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

AddSecurityUserComponent.propTypes = {
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  isLoading: PropTypes.bool,
  addSecurityUser: PropTypes.func,
  resetMessage: PropTypes.func,
  toggleModal: PropTypes.func
};

export default AddSecurityUserComponent;
