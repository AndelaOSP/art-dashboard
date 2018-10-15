import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';
import DropdownComponent from '../common/DropdownComponent';
import LoaderComponent from '../LoaderComponent';

const placeMakesInSemanticUIOptions = props =>
  props.map((option, index) => ({
    key: index,
    text: option.sub_category_name,
    value: option.id
  }));

const AssetTypesComponent = (props) => {
  if (props.isLoading) {
    return (
      <div className="loader-container" >
        <LoaderComponent />
      </div>
    );
  }

  return (
    <Form onSubmit={props.handleSubmit}>
      <label htmlFor="asset-type">
        Asset Type
        <InputFluid
          name="asset-type"
          onChange={props.onAddAssetType}
          placeHolder="Enter Asset Type"
        />
      </label>
      <br />
      <label htmlFor="subcategory" className="label-style">
        Asset Sub Category
        <DropdownComponent
          customClass="form-dropdown"
          label="Sub Category"
          placeHolder="Select Sub Category"
          name="subcategory"
          value={props.subCategorySelectedId}
          onChange={props.onSelectSubCategory}
          options={placeMakesInSemanticUIOptions(props.subcategories)}
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
    </Form>
  );
};

AssetTypesComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onAddAssetType: PropTypes.func.isRequired,
  onSelectSubCategory: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onChangeButtonState: PropTypes.func.isRequired,
  subcategories: PropTypes.array,
  buttonState: PropTypes.bool.isRequired,
  subCategorySelectedId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  isLoading: PropTypes.bool
};

AssetTypesComponent.defaultProps = {
  subcategories: [],
  isLoading: false
};

export default AssetTypesComponent;
