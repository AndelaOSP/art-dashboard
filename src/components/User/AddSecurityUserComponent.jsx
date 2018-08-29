import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import InputField from '../common/TextInputComponent';
import ArtButton from '../common/ButtonComponent';

const AddSecurityUserComponent = props => (
  <Form onSubmit={props.handleSubmit}>
    <label htmlFor="first-name">
      First Name
      <InputField
        id="first-name"
        name="firstName"
        placeHolder="Enter First Name"
        value={props.firstName}
        onChange={props.handleInputChange}
      />
    </label>
    <br />
    <label htmlFor="last-name">
    Last Name
      <InputField
        id="last-name"
        name="lastName"
        placeHolder="Enter Last Name"
        value={props.lastName}
        onChange={props.handleInputChange}
      />
    </label>
    <br />
    <label htmlFor="email">
    Email
      <InputField
        id="email"
        name="email"
        value={props.email}
        onChange={props.handleInputChange}
      />
    </label>
    <br />
    <label htmlFor="badge-number">
    Badge Number
      <InputField
        name="badgeNumber"
        id="badge-number"
        value={props.badgeNumber}
        onChange={props.handleInputChange}
      />
    </label>
    <br />
    <label htmlFor="phone-number">
    Phone Number
      <InputField
        id="phoneNumber"
        name="phone-number"
        value={props.phoneNumber}
        onChange={props.handleInputChange}
      />
    </label>
    <br />
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
  buttonState: PropTypes.bool
};

export default AddSecurityUserComponent;
