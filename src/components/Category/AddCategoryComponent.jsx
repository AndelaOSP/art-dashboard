import * as React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';

import '../../_css/AddAssetComponent.css';

const AddCategoryComponent = props => (
  <Form onSubmit={props.handleSubmit}>
    <label htmlFor="model-number" className="label-style">
      Category Name
      <InputFluid
        name="category-name"
        id="category"
        onChange={props.onaddCategoryName}
        placeholder="Enter Category Name"
      />
    </label>
    <br />
    <ArtButton buttonName="Cancel" onClick={props.toggleModal} />
    <ArtButton buttonName="Save" color="primary" />
  </Form>
);

AddCategoryComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onaddCategoryName: PropTypes.func,
  toggleModal: PropTypes.func
};

export default AddCategoryComponent;
