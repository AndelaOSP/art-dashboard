import PropTypes from 'prop-types';
import * as React from 'react';
import {
  Form,
  Input,
  Grid
} from 'semantic-ui-react';

import DropdownComponent from '../common/DropdownComponent';
import ArtButton from '../common/ButtonComponent';

import '../../_css/AddAssetComponent.css';

const placeCategoriesInSemanticUIOptions = props => props.map((option, index) => ({
  key: index,
  text: option.category_name,
  value: option.id
}));

const AddAssetComponent = props => (
  <div className="form-wrapper">
    <Form onSubmit={props.onCreateAsset}>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={6}>
            <Form.Group widths="equal" inline>
              <label className="label-style">Category</label>
              <DropdownComponent
                label="Asset Category"
                placeHolder="Select Asset Category"
                name="asset-category"
                options={placeCategoriesInSemanticUIOptions(props.categories)}
                onChange={props.handleDropdownChanges}
              />
            </Form.Group>
            <Form.Group widths="equal" inline>
              <label className="label-style">Type</label>
              <DropdownComponent
                label="Asset Type"
                options={props.filteredAssetTypes}
                placeholder="Select Asset Type"
                name="asset-types"
                onChange={props.handleDropdownChanges}
              />
            </Form.Group>
            <Form.Group widths="equal" inline>
              <label className="label-style">Model</label>
              <DropdownComponent
                label="Asset Model Number"
                options={props.filteredModelNumbers}
                placeholder="Select Asset Model Number"
                name="asset-model-number"
                onChange={props.onSelectModelNumber}
              />
            </Form.Group>
            <Form.Group widths="equal" inline>
              <label className="label-style">Asset Tag</label>
              <Input
                className="input-style"
                placeholder="Enter Asset Tag"
                name="asset-tag"
                onChange={props.onAddAssetTag}
              />
            </Form.Group>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Group widths="equal" inline>
              <label className="label-style">Sub Category</label>
              <DropdownComponent
                label="Asset Subcategory"
                options={props.filteredSubCategories}
                placeholder="Select Asset Subcategory"
                name="asset-subcategory"
                onChange={props.handleDropdownChanges}
              />
            </Form.Group>
            <Form.Group widths="equal" inline>
              <label className="label-style">Make</label>
              <DropdownComponent
                label="Asset Make"
                options={props.filteredAssetMakes}
                placeholder="Select Asset Make"
                name="asset-makes"
                onChange={props.handleDropdownChanges}
              />
            </Form.Group>
            <Form.Group widths="equal" inline>
              <label className="label-style">Serial Number</label>
              <Input
                className="input-style"
                placeholder="Enter Serial Number"
                name="serial-number"
                onChange={props.onAddSerialNumber}
              />
            </Form.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Form.TextArea
              label="Asset Specs"
              placeholder="Indepth details about asset..."
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.TextArea
              label="Condition"
              placeholder="..."
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Form.Group widths="equal">
              <ArtButton
                className="save"
                buttonName="Save"
                color="primary"
                handleClick={props.onChangeButtonState}
                buttonState={props.buttonState}
              />
              <ArtButton
                className="cancel"
                buttonName="Cancel"
                handleClick={props.toggleModal}
              />
            </Form.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  </div>
);

AddAssetComponent.propTypes = {
  handleDropdownChanges: PropTypes.func.isRequired,
  onSelectModelNumber: PropTypes.func.isRequired,
  onAddSerialNumber: PropTypes.func.isRequired,
  onAddAssetTag: PropTypes.func.isRequired,
  onCreateAsset: PropTypes.func.isRequired,
  filteredSubCategories: PropTypes.array,
  filteredAssetTypes: PropTypes.array,
  filteredAssetMakes: PropTypes.array,
  filteredModelNumbers: PropTypes.array,
  toggleModal: PropTypes.func.isRequired,
  onChangeButtonState: PropTypes.func.isRequired,
  buttonState: PropTypes.bool,
  categories: PropTypes.array
};

AddAssetComponent.defaultTypes = {
  filteredSubCategories: [],
  filteredAssetTypes: [],
  filteredAssetMakes: [],
  filteredModelNumbers: [],
  categories: [],
  buttonState: false
};

export default AddAssetComponent;
