import PropTypes from 'prop-types';
import * as React from 'react';
import _ from 'lodash';
import { Form } from 'semantic-ui-react';
import DropdownComponent from '../common/DropdownComponent';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';
import generateDropdownOptions from '../../_utils/generateDropdownOptions';

import '../../_css/AddAssetComponent.css';

const SaveButton = props => (
  <React.Fragment>
    {
        props.hasSpecs && (
          <div className="optional-label-text">
            <p>
              The selected asset has no specifications, click the submit button to finish
              creation
            </p>
          </div>
        )
      }

    <ArtButton
      className="save"
      buttonName="save"
      color="primary"
      buttonState={props.buttonLoading}
      disabledState={props.isDisabled || props.buttonLoading}
      handleClick={props.handleClick}
      fluidState
    />
  </React.Fragment>
);

SaveButton.propTypes = {
  hasSpecs: PropTypes.bool.isRequired,
  buttonLoading: PropTypes.bool,
  isDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func
};

SaveButton.defaultProps = {
  buttonLoading: false
};

const FilterAssetComponent = (props) => {
  const generateCategoryArray = () => {
    const categoryArray = [];
    props.categories.map(opt => (
      categoryArray.push(opt.category_name)
    ));

    return categoryArray;
  };

  const hasSpecs = !_.isEmpty(props.modelNumber) &&
    !_.isEmpty(props.assetTag) &&
    !_.isEmpty(props.serialNumber);

  return (
    <Form onSubmit={props.onCreateAsset} className="add-asset-form">
      <div className="label-style">Category <span className="input-asterisk"> * </span></div>
      <DropdownComponent
        customClass="form-dropdown add-asset-dropdown"
        label="Asset Category"
        placeholder="Select Asset Category"
        name="asset-category"
        value={props.selectedCategory}
        options={generateDropdownOptions(generateCategoryArray())}
        onChange={props.handleDropdownChanges}
        upward={false}
      />

      <div className="label-style">Sub Category <span className="input-asterisk"> * </span></div>
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

      <div className="label-style">Type <span className="input-asterisk"> * </span></div>
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

      <div className="label-style">Make <span className="input-asterisk"> * </span></div>
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

      <div className="label-style">Model Number <span className="input-asterisk"> * </span></div>
      <DropdownComponent
        customClass="form-dropdown add-asset-dropdown"
        label="Asset Model Number"
        options={props.filteredModelNumbers}
        placeholder="Select Asset Model Number"
        name="modelNumber"
        value={props.modelNumber}
        onChange={props.handleInputChange}
        upward={false}
      />

      <div className="label-style">Asset Tag <span className="input-asterisk"> * </span></div>
      <InputFluid
        customCss="input-style"
        placeholder="Enter Asset Tag"
        name="assetTag"
        value={props.assetTag}
        onChange={props.handleInputChange}
      />

      <div className="label-style">Serial Number <span className="input-asterisk"> * </span></div>
      <InputFluid
        customCss="input-style"
        placeholder="Enter Serial Number"
        name="serialNumber"
        value={props.serialNumber}
        onChange={props.handleInputChange}
      />

      {
        props.isAssetSpecsAvailable && !props.isDisabled
          ?
            <ArtButton
              className="save"
              buttonName="Next"
              color="primary"
              handleClick={props.onNextClicked}
              buttonState={props.buttonLoading}
              disabledState={props.isDisabled}
              fluidState
            />
          :
            <SaveButton
              hasSpecs={hasSpecs}
              buttonLoading={props.buttonLoading}
              isDisabled={props.isDisabled}
              handleClick={props.reset}
            />
      }
    </Form>
  );
};

FilterAssetComponent.propTypes = {
  handleDropdownChanges: PropTypes.func.isRequired,
  filteredSubCategories: PropTypes.array,
  filteredAssetTypes: PropTypes.array,
  filteredAssetMakes: PropTypes.array,
  filteredModelNumbers: PropTypes.array,
  onNextClicked: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  categories: PropTypes.array,
  buttonLoading: PropTypes.bool,
  selectedCategory: PropTypes.string,
  selectedSubcategory: PropTypes.string,
  selectedAssetType: PropTypes.string,
  selectedAssetMake: PropTypes.string,
  handleInputChange: PropTypes.func,
  modelNumber: PropTypes.string,
  assetTag: PropTypes.string,
  serialNumber: PropTypes.string,
  isAssetSpecsAvailable: PropTypes.bool,
  onCreateAsset: PropTypes.func.isRequired,
  reset: PropTypes.func
};

FilterAssetComponent.defaultProps = {
  filteredSubCategories: [],
  filteredAssetTypes: [],
  filteredAssetMakes: [],
  filteredModelNumbers: [],
  categories: [],
  isAssetSpecsAvailable: false,
  handleInputChange: () => {}
};

export default FilterAssetComponent;
