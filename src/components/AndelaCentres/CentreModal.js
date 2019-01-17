import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InputFluid from '../common/TextInputComponent';
import ArtButton from '../common/ButtonComponent';
import DropdownComponent from '../common/DropdownComponent';

const generateDropdownOptions = locations =>
  locations.map(location => ({
    key: location.id,
    text: location.country,
    value: location.country
  }));

const CentreModal = props => (
  <Form onSubmit={this.handleSubmit}>
    <label htmlFor="centre" className="label-style">
      Centre Name
      <InputFluid name="centre" onChange={props.handleChange} placeHolder="Enter Centre Name" />
    </label>
    <br />
    <label htmlFor="asset-make" className="label-style">
      Country
      <DropdownComponent
        customClass="form-dropdown add-asset-dropdown"
        label="Country"
        placeholder="Select Country"
        name="country"
        value={props.country}
        options={generateDropdownOptions(props.countries)}
        onChange={props.onSelectCountry}
        upward={false}
      />
    </label>

    <div className="modal__buttons">
      <ArtButton customCss="cancel" buttonName="Cancel" handleClick={props.toggleModal} />
      <ArtButton
        customCss="save"
        buttonName="Save"
        color="primary"
        handleClick={props.handleSubmit}
      />
    </div>
  </Form>
);

CentreModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onSelectCountry: PropTypes.func.isRequired,
  country: PropTypes.string,
  countries: PropTypes.array
};

export default CentreModal;
