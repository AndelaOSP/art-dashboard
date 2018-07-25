import PropTypes from 'prop-types';
import * as React from 'react';
import { Form } from 'semantic-ui-react';

import DropdownComponent from '../common/DropdownComponent';
import InputFluid from '../common/TextInputComponent';
import ArtButton from '../common/ButtonComponent';


const AddAssetComponent = props => (
  <div>
    <div className="page-indicator">
      <div
        className={props.page === 0 ? 'circle shade-1' : 'circle no-shade'}
        onClick={props.goBack}
        onKeyDown={() => {}}
        role="presentation"
      >1
      </div>
      <div className="page-text">Identify your device</div>
      <div className="line" />
      <div className={props.page === 0 ? 'circle no-shade' : 'circle shade-1'}>2</div>
      <div className="page-text">Fill out device specs</div>
    </div>
    <Form onSubmit={props.onCreateAsset}>
      <label className="label-style">Model</label>
      <DropdownComponent
        label="Asset Model Number"
        options={props.filteredModelNumbers}
        placeholder="Select Asset Model Number"
        name="asset-model-number"
        onChange={props.onSelectModelNumber}
      />
      <label className="label-style">Asset Tag</label>
      <InputFluid
        className="input-style"
        placeholder="Enter Asset Tag"
        name="asset-tag"
        onChange={props.onAddAssetTag}
      />
      <label className="label-style">Serial Number</label>
      <InputFluid
        className="input-style"
        placeholder="Enter Serial Number"
        name="serial-number"
        onChange={props.onAddSerialNumber}
      />
      <Form.TextArea
        label="Asset Specs"
        placeholder="Indepth details about asset..."
      />
      <Form.TextArea
        label="Condition"
        placeholder="..."
      />
      <ArtButton
        className="cancel"
        buttonName="Discard"
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
  </div>
);

AddAssetComponent.propTypes = {
  onSelectModelNumber: PropTypes.func.isRequired,
  onAddSerialNumber: PropTypes.func.isRequired,
  onAddAssetTag: PropTypes.func.isRequired,
  onCreateAsset: PropTypes.func.isRequired,
  filteredModelNumbers: PropTypes.array,
  toggleModal: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  onChangeButtonState: PropTypes.func.isRequired,
  buttonState: PropTypes.bool,
  page: PropTypes.number
};

AddAssetComponent.defaultTypes = {
  filteredSubCategories: [],
  filteredAssetTypes: [],
  filteredAssetMakes: [],
  filteredModelNumbers: [],
  categories: [],
  buttonState: false,
  page: 1
};

export default AddAssetComponent;
