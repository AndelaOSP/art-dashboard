import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';
import DropdownComponent from '../common/DropdownComponent';
import '../../_css/AddAssetComponent.css';

const placeMakesInSemanticUIOptions = assetMakesList =>
  assetMakesList.map((option, index) => ({
    key: index,
    text: option.make_label,
    value: option.id
  }));

const ModelNumberComponent = props => (
  <div>
    <Form onSubmit={props.handleSubmit}>
      <label htmlFor="model-number" className="label-style">
        Model Number
        <InputFluid
          name="model-number"
          onChange={props.onAddModelNumber}
          placeHolder="Enter Model Number"
        />
      </label>
      <br />
      <label htmlFor="asset-make" className="label-style">
        Asset Make
        <DropdownComponent
          label="Asset Makes"
          placeHolder="Select Asset Makes"
          name="asset-make"
          onChange={props.onSelectAssetMake}
          options={placeMakesInSemanticUIOptions(props.assetMakes)}
        />
      </label>
      <br />
      <ArtButton
        buttonName="Save"
        color="primary"
        handleClick={props.onChangeButtonState}
        buttonState={props.buttonState}
      />
      <ArtButton
        buttonName="Cancel"
        onClick={props.toggleModal}
      />
    </Form>
  </div>
);

ModelNumberComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onAddModelNumber: PropTypes.func.isRequired,
  onSelectAssetMake: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onChangeButtonState: PropTypes.func.isRequired,
  assetMakes: PropTypes.array,
  buttonState: PropTypes.bool.isRequired
};

ModelNumberComponent.defaultProps = {
  assetMakes: []
};

export default ModelNumberComponent;
