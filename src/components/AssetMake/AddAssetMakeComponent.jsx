import * as React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';
import DropdownComponent from '../common/DropdownComponent';
import '../../_css/AddAssetComponent.css';

const assetTypeOptions = assetTypes =>
  assetTypes && assetTypes
    .map((typeOption, index) => ({
      key: index,
      text: typeOption.asset_type,
      value: typeOption.id
    }));

const AddAssetMakeComponent = props => (
  <Form onSubmit={props.handleSubmit}>
    <label htmlFor="asset-make" className="label-style">
      Asset Make
      <InputFluid
        name="asset-make"
        id="make"
        onChange={props.onaddAssetMake}
        placeholder="Enter Asset Make"
      />
    </label>
    <br />
    <label htmlFor="asset-type" className="label-style">
      Asset Type
      <DropdownComponent
        label="Asset type"
        placeHolder="Select Asset type"
        name="asset-type"
        onChange={props.onSelectAssetType}
        options={assetTypeOptions(props.assetTypes)}
      />
    </label>
    <br />
    <ArtButton
      buttonName="Save"
      color="primary"
    />
    <ArtButton
      buttonName="Cancel"
      onClick={props.toggleModal}
    />
  </Form>
);

AddAssetMakeComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onaddAssetMake: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  assetTypes: PropTypes.array,
  onSelectAssetType: PropTypes.func.isRequired
};

export default AddAssetMakeComponent;
