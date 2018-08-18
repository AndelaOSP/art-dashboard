import PropTypes from 'prop-types';
import * as React from 'react';
import DropdownComponent from '../common/DropdownComponent';
import ArtButton from '../common/ButtonComponent';
import LoaderComponent from '../LoaderComponent';

import '../../_css/ModalComponent.css';
import '../../_css/AddAssetComponent.css';

const placeCategoriesInSemanticUIOptions = props => props.map((option, index) => ({
  key: index,
  text: option.category_name,
  value: option.category_name
}));

const FilterAssetComponent = (props) => {
  if (Object.values(props.isLoadingState).find(loading => loading === true)) {
    return (<LoaderComponent />);
  }

  return (
    <div className="modal-container" >
      <div className="page-indicator">
        <div className={props.page === 0 ? 'circle shade-2' : 'circle shade-1'}>1</div>
        Identify your device
        <div className="line" />
        <div className="circle">2</div>
        Fill out device specs
      </div>
      <div className="label-style">Category</div>
      <DropdownComponent
        customClass="form-dropdown"
        label="Asset Category"
        placeHolder="Select Asset Category"
        name="asset-category"
        value={props.selectedCategory}
        options={placeCategoriesInSemanticUIOptions(props.categories)}
        onChange={props.handleDropdownChanges}
        customCss="add-asset-dropdown"
      />
      <div className="label-style">Sub Category</div>
      <DropdownComponent
        customClass="form-dropdown"
        label="Asset Subcategory"
        options={props.filteredSubCategories}
        placeholder="Select Asset Subcategory"
        name="asset-subcategory"
        value={props.selectedSubcategory}
        onChange={props.handleDropdownChanges}
        customCss="add-asset-dropdown"
      />
      <div className="label-style">Type</div>
      <DropdownComponent
        customClass="form-dropdown"
        label="Asset Type"
        options={props.filteredAssetTypes}
        placeholder="Select Asset Type"
        name="asset-types"
        value={props.selectedAssetType}
        onChange={props.handleDropdownChanges}
        customCss="add-asset-dropdown"
      />
      <div className="label-style">Make</div>
      <DropdownComponent
        customClass="form-dropdown"
        label="Asset Make"
        options={props.filteredAssetMakes}
        placeholder="Select Asset Make"
        name="asset-makes"
        value={props.selectedAssetMake}
        onChange={props.handleDropdownChanges}
        customCss="add-asset-dropdown"
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
};

FilterAssetComponent.propTypes = {
  handleDropdownChanges: PropTypes.func.isRequired,
  filteredSubCategories: PropTypes.array,
  filteredAssetTypes: PropTypes.array,
  filteredAssetMakes: PropTypes.array,
  toggleModal: PropTypes.func.isRequired,
  onNextClicked: PropTypes.func.isRequired,
  buttonState: PropTypes.bool,
  categories: PropTypes.array,
  page: PropTypes.number.isRequired,
  selectedCategory: PropTypes.string,
  selectedSubcategory: PropTypes.string,
  selectedAssetType: PropTypes.string,
  selectedAssetMake: PropTypes.string,
  isLoadingState: PropTypes.object.isRequired
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
