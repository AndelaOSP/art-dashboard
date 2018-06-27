import * as React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';

import '../../_css/AddAssetComponent.css';

const AddCategoryComponent = props => (
  <Form onSubmit={props.handleSubmit}>
    <Label htmlFor="category" className="label-style">Category Name</Label>
    <InputFluid
      name="category-name"
      id="category"
      onChange={props.onaddCategoryName}
      placeholder="Enter Category Name"
    />
    <br />
    <ArtButton buttonName="Save" color="primary" />
    <ArtButton buttonName="Cancel" onClick={props.toggleModal} />
  </Form>
);

AddCategoryComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onaddCategoryName: PropTypes.func,
  toggleModal: PropTypes.func
};

export default AddCategoryComponent;
