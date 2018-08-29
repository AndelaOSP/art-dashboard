import PropTypes from 'prop-types';
import * as React from 'react';
import { Form } from 'semantic-ui-react';

import DropdownComponent from '../common/DropdownComponent';
import InputFluid from '../common/TextInputComponent';
import ArtButton from '../common/ButtonComponent';

import '../../_css/ModalComponent.css';
import '../../_css/AddAssetComponent.css';

const specsAssetTypes = [
  'Asset Types To Be Specified By Admin'
];

const specsComponentCheck = (userDefinedassetType) => {
  const foundAssetType = specsAssetTypes.find(assetType => assetType === userDefinedassetType);
  if (foundAssetType !== undefined) {
    return true;
  }
  return false;
};

const AddAssetComponent = props => (
  <div className="modal-container">
    <div className="page-indicator">
      <div
        className={props.page === 0 ? 'circle shade-1' : 'circle no-shade'}
        onKeyDown={() => { }}
        role="presentation"
      >1
      </div>
      <div className="page-text">Identify your device</div>
      <div className="line" />
      <div className={props.page === 0 ? 'circle no-shade' : 'circle shade-1'}>2</div>
      <div className="page-text">Fill out device specs</div>
    </div>
    <Form onSubmit={props.onCreateAsset}>
      <div className="label-style">Model Number</div>
      <DropdownComponent
        customClass="form-dropdown"
        label="Asset Model Number"
        options={props.filteredModelNumbers}
        placeholder="Select Asset Model Number"
        name="asset-model-number"
        value={props.modelNumber}
        onChange={props.onSelectModelNumber}
        customCss="add-asset-dropdown"
      />
      <div className="label-style">Asset Tag</div>
      <InputFluid
        customCss="input-style"
        placeholder="Enter Asset Tag"
        name="asset-tag"
        value={props.assetTag}
        onChange={props.onAddAssetTag}
      />
      <div className="label-style">Serial Number</div>
      <InputFluid
        customCss="input-style"
        placeholder="Enter Serial Number"
        name="serial-number"
        value={props.serialNumber}
        onChange={props.onAddSerialNumber}
      />
      <ArtButton
        customCss="previous-button"
        buttonName="Previous"
        handleClick={props.goBack}
      />
      {
        specsComponentCheck(props.selectedAssetType) === true ?
          <ArtButton
            className="save"
            buttonName="Next"
            color="primary"
            handleClick={props.onNextClicked}
            disabledState={props.isDisabled}
          />
          :
          <ArtButton
            className="save"
            buttonName="save"
            color="primary"
            handleClick={props.onChangeButtonState}
            buttonState={props.buttonState}
            disabledState={props.isDisabled}
          />
      }
    </Form>
  </div>
);

AddAssetComponent.propTypes = {
  onSelectModelNumber: PropTypes.func.isRequired,
  onAddSerialNumber: PropTypes.func.isRequired,
  onAddAssetTag: PropTypes.func.isRequired,
  onCreateAsset: PropTypes.func.isRequired,
  filteredModelNumbers: PropTypes.array,
  goBack: PropTypes.func.isRequired,
  onChangeButtonState: PropTypes.func.isRequired,
  onNextClicked: PropTypes.func.isRequired,
  selectedAssetType: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  buttonState: PropTypes.bool,
  page: PropTypes.number,
  modelNumber: PropTypes.string,
  assetTag: PropTypes.string,
  serialNumber: PropTypes.string
};

AddAssetComponent.defaultTypes = {
  filteredSubCategories: [],
  filteredAssetMakes: [],
  filteredModelNumbers: [],
  categories: [],
  buttonState: false,
  page: 1,
  assetTag: '',
  serialNumber: '',
  modelNumber: ''
};

export default AddAssetComponent;
