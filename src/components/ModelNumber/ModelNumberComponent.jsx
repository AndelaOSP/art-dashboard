import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';
import DropdownComponent from '../common/DropdownComponent';
import '../../_css/AddAssetComponent.css';
import LoaderComponent from '../LoaderComponent';

const placeMakesInSemanticUIOptions = assetMakesList =>
  assetMakesList.map((option, index) => ({
    key: index,
    text: option.make_label,
    value: option.id
  }));

const ModelNumberComponent = (props) => {
  if (props.isLoading) {
    return (<LoaderComponent />);
  }

  return (
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
            customClass="form-dropdown"
            label="Asset Makes"
            placeHolder="Select Asset Makes"
            name="asset-make"
            value={props.assetMakeSelectedId}
            onChange={props.onSelectAssetMake}
            options={placeMakesInSemanticUIOptions(props.assetMakes)}
          />
        </label>
        <br />
        <ArtButton
          className="cancel"
          buttonName="Cancel"
          handleClick={props.toggleModal}
        />
        <ArtButton
          className="save"
          buttonName="Save"
          color="primary"
          handleClick={props.onChangeButtonState}
          buttonState={props.buttonState}
        />
      </Form >
    </div >
  );
};

ModelNumberComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onAddModelNumber: PropTypes.func.isRequired,
  onSelectAssetMake: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onChangeButtonState: PropTypes.func.isRequired,
  assetMakes: PropTypes.array,
  assetMakeSelectedId: PropTypes.number,
  buttonState: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

ModelNumberComponent.defaultProps = {
  assetMakes: []
};

export default ModelNumberComponent;
