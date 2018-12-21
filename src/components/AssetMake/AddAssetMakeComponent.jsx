import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';
import DropdownComponent from '../../components/common/DropdownComponent';
import '../../_css/AddAssetComponent.css';
import LoaderComponent from '../LoaderComponent';

const assetTypeOptions = assetTypes =>
  assetTypes
    .map((typeOption, index) => ({
      key: index,
      text: typeOption.asset_type,
      value: typeOption.id
    }));

const AddAssetMakeComponent = (props) => {
  if (props.isLoading) {
    return <LoaderComponent />;
  }

  return (
    <Form onSubmit={props.handleSubmit}>
      <label htmlFor="asset-make" className="label-style">
        Asset Make
        <InputFluid
          name="make_label"
          id="make"
          onChange={props.onaddAssetMake}
          placeholder="Enter Asset Make"
        />
      </label>
      <br />
      <label htmlFor="asset-type" className="label-style">
        Asset Type
        <DropdownComponent
          customClass="form-dropdown"
          label="Asset type"
          placeHolder="Select Asset type"
          name="asset-type"
          value={props.assetTypeSelectedId}
          onChange={props.onSelectAssetType}
          options={assetTypeOptions(props.assetTypes)}
        />
      </label>

      <div className="modal__buttons">
        <ArtButton
          customCss="cancel"
          buttonName="Cancel"
          handleClick={props.toggleModal}
        />

        <ArtButton
          customCss="save"
          buttonName="Save"
          color="primary"
          handleClick={props.onChangeButtonState}
          buttonState={props.buttonState}
        />
      </div>
    </Form>
  );
};

AddAssetMakeComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onaddAssetMake: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  assetTypes: PropTypes.array,
  assetTypeSelectedId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  onChangeButtonState: PropTypes.func.isRequired,
  buttonState: PropTypes.bool,
  onSelectAssetType: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

AddAssetMakeComponent.defaultProps = {
  assetTypes: [],
  buttonState: false
};

export default AddAssetMakeComponent;
