import PropTypes from 'prop-types';
import * as React from 'react';
import { Form } from 'semantic-ui-react';
import DropdownComponent from '../common/DropdownComponent';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';

import '../../_css/AddAssetComponent.css';

const placeCategoriesInSemanticUIOptions = props => props.map((option, index) => ({
  key: index,
  text: option.category_name,
  value: option.category_name
}));

const FilterAssetComponent2 = props => (
  <React.Fragment>
    <div className="label-style">Category</div>
    <DropdownComponent
      customClass="form-dropdown add-asset-dropdown"
      label="Asset Category"
      placeholder="Select Asset Category"
      name="asset-category"
      value={props.selectedCategory}
      options={placeCategoriesInSemanticUIOptions(props.categories)}
      onChange={props.handleDropdownChanges}
      upward={false}
    />

    <div className="label-style">Sub Category</div>
    <DropdownComponent
      customClass="form-dropdown add-asset-dropdown"
      label="Asset Subcategory"
      options={props.filteredSubCategories}
      placeholder="Select Asset Subcategory"
      name="asset-subcategory"
      value={props.selectedSubcategory}
      onChange={props.handleDropdownChanges}
      upward={false}
    />

    <div className="label-style">Type</div>
    <DropdownComponent
      customClass="form-dropdown add-asset-dropdown"
      label="Asset Type"
      options={props.filteredAssetTypes}
      placeholder="Select Asset Type"
      name="asset-types"
      value={props.selectedAssetType}
      onChange={props.handleDropdownChanges}
      upward={false}
    />

    <div className="label-style">Make</div>
    <DropdownComponent
      customClass="form-dropdown add-asset-dropdown"
      label="Asset Make"
      options={props.filteredAssetMakes}
      placeholder="Select Asset Make"
      name="asset-makes"
      value={props.selectedAssetMake}
      onChange={props.handleDropdownChanges}
      upward={false}
    />

    <div className="label-style">Model Number</div>
    <DropdownComponent
      customClass="form-dropdown add-asset-dropdown"
      label="Asset Model Number"
      options={props.filteredModelNumbers}
      placeholder="Select Asset Model Number"
      name="asset-model-number"
      value={props.modelNumber}
      onChange={props.onSelectModelNumber}
      upward={false}
    />

    <div className="label-style">Asset Tag</div>
    <InputFluid
      customCss="input-style"
      placeholder="Enter Asset Tag"
      name="asset-tag"
      value={props.assetTag}
      onChange={props.onAddAssetTag}
    />

    <div className="label-style">Serial Number</div>
    <InputFluid
      customCss="input-style"
      placeholder="Enter Serial Number"
      name="serial-number"
      value={props.serialNumber}
      onChange={props.onAddSerialNumber}
    />

    {
        props.isAssetSpecsAvailable && !props.isDisabled
        ?
          <ArtButton
            className="save"
            buttonName="Next"
            color="primary"
            handleClick={props.onNextClicked}
            buttonState={props.buttonState}
            disabledState={props.isDisabled}
            fluidState
          />
        :
          <React.Fragment>
            <div className="optional-label-text">
              <p>
              The selected asset has no specifications, click the submit button to finish creation
              </p>
            </div>

            <Form onSubmit={props.onCreateAsset} className="add-asset-form">
              <ArtButton
                className="save"
                buttonName="save"
                color="primary"
                handleClick={props.onChangeButtonState}
                buttonState={props.buttonState}
                disabledState={props.isDisabled}
                fluidState
              />
            </Form>
          </React.Fragment>
    }
  </React.Fragment>
);

FilterAssetComponent2.propTypes = {
  handleDropdownChanges: PropTypes.func.isRequired,
  filteredSubCategories: PropTypes.array,
  filteredAssetTypes: PropTypes.array,
  filteredAssetMakes: PropTypes.array,
  filteredModelNumbers: PropTypes.array,
  onNextClicked: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  categories: PropTypes.array,
  buttonState: PropTypes.bool,
  selectedCategory: PropTypes.string,
  selectedSubcategory: PropTypes.string,
  selectedAssetType: PropTypes.string,
  selectedAssetMake: PropTypes.string,
  onSelectModelNumber: PropTypes.func.isRequired,
  onAddSerialNumber: PropTypes.func.isRequired,
  onAddAssetTag: PropTypes.func.isRequired,
  modelNumber: PropTypes.string,
  assetTag: PropTypes.string,
  serialNumber: PropTypes.string,
  onChangeButtonState: PropTypes.func.isRequired,
  isAssetSpecsAvailable: PropTypes.bool.isRequired,
  onCreateAsset: PropTypes.func.isRequired
};

FilterAssetComponent2.defaultTypes = {
  filteredSubCategories: [],
  filteredAssetTypes: [],
  filteredAssetMakes: [],
  filteredModelNumbers: [],
  categories: [],
  isAssetSpecsAvailable: false
};

export default FilterAssetComponent2;
