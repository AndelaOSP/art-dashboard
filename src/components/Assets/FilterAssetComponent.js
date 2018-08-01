import PropTypes from 'prop-types';
import * as React from 'react';
import DropdownComponent from '../common/DropdownComponent';
import ArtButton from '../common/ButtonComponent';

import '../../_css/ModalComponent.css';

const placeCategoriesInSemanticUIOptions = props => props.map((option, index) => ({
  key: index,
  text: option.category_name,
  value: option.category_name
}));

const FilterAssetComponent = props => (
  <div>
    <div className="page-indicator">
      <div className={props.page === 0 ? 'circle shade-2' : 'circle shade-1'}>1</div>
      Identify your device
      <div className="line" />
      <div className="circle">2</div>
      Fill out device specs
    </div>
    <label className="label-style">Category</label>
    <DropdownComponent
      label="Asset Category"
      placeHolder="Select Asset Category"
      name="asset-category"
      options={placeCategoriesInSemanticUIOptions(props.categories)}
      onChange={props.handleDropdownChanges}
    />
    <label className="label-style">Sub Category</label>
    <DropdownComponent
      label="Asset Subcategory"
      options={props.filteredSubCategories}
      placeholder="Select Asset Subcategory"
      name="asset-subcategory"
      onChange={props.handleDropdownChanges}
    />
    <label className="label-style">Type</label>
    <DropdownComponent
      label="Asset Type"
      options={props.filteredAssetTypes}
      placeholder="Select Asset Type"
      name="asset-types"
      onChange={props.handleDropdownChanges}
    />
    <label className="label-style">Make</label>
    <DropdownComponent
      label="Asset Make"
      options={props.filteredAssetMakes}
      placeholder="Select Asset Make"
      name="asset-makes"
      onChange={props.handleDropdownChanges}
    />
    <ArtButton
      className="cancel"
      buttonName="Discard"
      handleClick={props.toggleModal}
    />
    <ArtButton
      className="save"
      buttonName="Next"
      color="primary"
      handleClick={props.onNextClicked}
      buttonState={props.buttonState}
    />
  </div>
);

FilterAssetComponent.propTypes = {
  handleDropdownChanges: PropTypes.func.isRequired,
  filteredSubCategories: PropTypes.array,
  filteredAssetTypes: PropTypes.array,
  filteredAssetMakes: PropTypes.array,
  toggleModal: PropTypes.func.isRequired,
  onNextClicked: PropTypes.func.isRequired,
  buttonState: PropTypes.bool,
  categories: PropTypes.array,
  page: PropTypes.number.isRequired
};

FilterAssetComponent.defaultTypes = {
  filteredSubCategories: [],
  filteredAssetTypes: [],
  filteredAssetMakes: [],
  filteredModelNumbers: [],
  categories: [],
  buttonState: false
};

export default FilterAssetComponent;

