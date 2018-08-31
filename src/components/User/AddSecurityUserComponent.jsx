import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';
import ArtButton from '../common/ButtonComponent';

const AddSecurityUserComponent = props => (
  <Form size="large" error={props.error} onSubmit={props.handleSubmit}>
    <Form.Input
      label="First Name"
      width={15}
      id="first-name"
      name="firstName"
      placeholder="Enter First Name"
      value={props.firstName}
      onChange={props.handleInputChange}
    />
    <Form.Input
      label="Last Name"
      width={15}
      id="last-name"
      name="lastName"
      placeholder="Enter Last Name"
      value={props.lastName}
      onChange={props.handleInputChange}
    />
    <Form.Input
      required
      label="Email"
      name="email"
      width={15}
      value={props.email}
      onChange={props.handleInputChange}
    />
    <Form.Input
      required
      label="Badge Number"
      width={15}
      name="badgeNumber"
      id="badge-number"
      value={props.badgeNumber}
      onChange={props.handleInputChange}
    />
    <Form.Input
      label="Phone Number"
      width={15}
      id="phoneNumber"
      name="phone-number"
      value={props.phoneNumber}
      onChange={props.handleInputChange}
    />
    <Message
      error
      content="Please enter a valid Email"
    />
    <ArtButton
      className="save"
      buttonName="save"
      color="primary"
      handleClick={props.onChangeButtonState}
      buttonState={props.buttonState}
    />
  </Form>
);

AddSecurityUserComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  badgeNumber: PropTypes.string,
  phoneNumber: PropTypes.string,
  handleInputChange: PropTypes.func,
  onChangeButtonState: PropTypes.func,
  buttonState: PropTypes.bool,
  error: PropTypes.bool
};

export default AddSecurityUserComponent;
