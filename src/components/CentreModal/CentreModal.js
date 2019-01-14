import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InputFluid from '../common/TextInputComponent';
import ArtButton from '../common/ButtonComponent';

const CentreModal = props => (
  <Form onSubmit={this.handleSubmit}>
    <label htmlFor="centre" className="label-style">
      Centre Name
      <InputFluid name="centre" onChange={props.onAddCentre} placeHolder="Enter Centre Name" />
    </label>
    <br />
    <label htmlFor="asset-make" className="label-style">
      Country
      <InputFluid name="country" onChange={props.onAddCountry} placeHolder="Enter Centre Country" />
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
  onAddCentre: PropTypes.func.isRequired,
  onAddCountry: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default CentreModal;
