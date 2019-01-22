import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';
import DropdownComponent from '../common/DropdownComponent';
import LoaderComponent from '../LoaderComponent';

const populateCategories = props =>
  props.map((option, index) => ({
    key: index,
    text: option.name,
    value: option.id
  }));

const AddSubCategoryComponent = (props) => {
  if (props.isLoading) {
    return <LoaderComponent />;
  }

  return (
    <Form onSubmit={props.handleSubmit}>
      <label htmlFor="category" className="label-style">
        <label htmlFor="sub-category" className="label-style">
          Sub-Category
          <InputFluid
            name="sub-category"
            onChange={props.onAddSubCategory}
            placeHolder="Enter Sub-Category"
          />
        </label>
        <br />
        Category
        <DropdownComponent
          customClass="form-dropdown"
          label="Categories"
          placeHolder="Select A Category"
          name="category"
          value={props.categorySelectedId}
          onChange={props.onSelectCategory}
          options={populateCategories(props.categoriesList)}
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

AddSubCategoryComponent.propTypes = {
  categoriesList: PropTypes.array,
  categorySelectedId: PropTypes.number,
  buttonState: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onAddSubCategory: PropTypes.func.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onChangeButtonState: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

AddSubCategoryComponent.defaultProps = {
  categoriesList: [],
  isLoading: false
};

export default AddSubCategoryComponent;
