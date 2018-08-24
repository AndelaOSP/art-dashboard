import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import InputField from '../common/TextInputComponent';
import ArtButton from '../common/ButtonComponent';

const AddUserComponent = props => (
  <Form onSubmit={props.handleSubmit}>
    <label htmlFor="first-name">
      First Name
      <InputField
        id="first-name"
        name="first-name"
        placeHolder="Enter First Name"
        value={props.firstName}
        onChange={props.onFirstNameChange}
      />
    </label>
    <br />
    <label htmlFor="last-name">
    Last Name
      <InputField
        id="last-name"
        name="last-name"
        placeHolder="Enter Last Name"
        value={props.lastName}
        onChange={props.onLastNameChange}
      />
    </label>
    <br />
    <label htmlFor="email">
    Email
      <InputField
        id="email"
        name="email"
        value={props.email}
        onChange={props.onEmailChange}
      />
    </label>
    <br />
    <label htmlFor="badge-number">
    Badge Number
      <InputField
        name="badge-number"
        id="badge-number"
        value={props.badgeNumber}
        onChange={props.onBadgeNumberChange}
      />
    </label>
    <br />
    <label htmlFor="phone-number">
    Phone Number
      <InputField
        id="phone-number"
        name="phone-number"
        value={props.phoneNumber}
        onChange={props.onPhoneNumberChange}
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

AddUserComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  badgeNumber: PropTypes.string,
  phoneNumber: PropTypes.string,
  onFirstNameChange: PropTypes.func,
  onLastNameChange: PropTypes.func,
  onEmailChange: PropTypes.func,
  onBadgeNumberChange: PropTypes.func,
  onPhoneNumberChange: PropTypes.func,
  onChangeButtonState: PropTypes.func,
  buttonState: PropTypes.bool
};

export default AddUserComponent;
