import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';
import DropdownComponent from '../common/DropdownComponent';

const populateCategories = props =>
  props.map((option, index) => ({
    key: index,
    text: option.category_name,
    value: option.id
  }));

const AddSubCategoryComponent = props => (
  <Form onSubmit={props.handleSubmit}>
    <label htmlFor="category" className="label-style">
      Category
      <DropdownComponent
        label="Categories"
        placeHolder="Select A Category"
        name="category"
        onChange={props.onSelectCategory}
        options={populateCategories(props.categoriesList)}
      />
    </label>

    <br />
    <label htmlFor="sub-category" className="label-style">
      Sub-Category
      <InputFluid
        name="sub-category"
        onChange={props.onAddSubCategory}
        placeHolder="Enter Sub-Category"
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
);

AddSubCategoryComponent.propTypes = {
  categoriesList: PropTypes.array,
  buttonState: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onAddSubCategory: PropTypes.func.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onChangeButtonState: PropTypes.func.isRequired
};

AddSubCategoryComponent.defaultProps = {
  categoriesList: []
};

export default AddSubCategoryComponent;
