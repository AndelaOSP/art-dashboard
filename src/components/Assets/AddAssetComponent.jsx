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
      <label className="label-style">Model Number</label>
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
      <div className="optional-label-text">
        <label>Optional Fields</label>
      </div>
      <div className="optional-label-text">
        <label>Year Of Manufacture</label>
      </div>
      <DropdownComponent
        className="input-style"
        placeholder="Enter Year Of Manufacture"
        name="year"
        options={yearOfManufacture}
        onChange={props.onSelectYearOfManufacture}
      />
      <Form.Group inline>
        <label>Processor Type (Intel)</label>
        <Form.Radio
          label="Core i3"
          value="Intel core i3"
          name="processorType"
          onChange={props.onSelectProcessorType}
          checked={props.processorType === 'Intel core i3'}
        />
        <Form.Radio
          label="Core i5"
          value="Intel core i5"
          name="processorType"
          onChange={props.onSelectProcessorType}
          checked={props.processorType === 'Intel core i5'}
        />
        <Form.Radio
          label="Core i7"
          value="Intel core i7"
          name="processorType"
          onChange={props.onSelectProcessorType}
          checked={props.processorType === 'Intel core i7'}
        />
      </Form.Group>
      <Form.Group inline>
        <label>Processor Speed (GHz)</label>
        <Form.Radio
          label="1.8"
          value="1.8"
          name="processorSpeed"
          onChange={props.onSelectProcessorSpeed}
          checked={props.processorSpeed === '1.8'}
        />
        <Form.Radio
          label="2.3"
          value="2.3"
          name="processorSpeed"
          onChange={props.onSelectProcessorSpeed}
          checked={props.processorSpeed === '2.3'}
        />
        <Form.Radio
          label="3.0"
          value="3.0"
          name="processorSpeed"
          onChange={props.onSelectProcessorSpeed}
          checked={props.processorSpeed === '3.0'}
        />
        <Form.Radio
          label="3.4"
          value="3.4"
          name="processorSpeed"
          onChange={props.onSelectProcessorSpeed}
          checked={props.processorSpeed === '3.4'}
        />
      </Form.Group>
      <Form.Group inline>
        <label>Screen Size (inches)</label>
        <Form.Radio
          label="13"
          value="13"
          name="screenSize"
          onChange={props.onSelectScreenSize}
          checked={props.screenSize === '13'}
        />
        <Form.Radio
          label="15"
          value="15"
          name="screenSize"
          onChange={props.onSelectScreenSize}
          checked={props.screenSize === '15'}
        />
        <Form.Radio
          label="27"
          value="17"
          name="screenSize"
          onChange={props.onSelectScreenSize}
          checked={props.screenSize === '17'}
        />
      </Form.Group>
      <Form.Group inline>
        <label>Storage (GB)</label>
        <Form.Radio
          label="128"
          value="128"
          name="storage"
          onChange={props.onSelectStorage}
          checked={props.storage === '128'}
        />
        <Form.Radio
          label="256"
          value="256"
          name="storage"
          onChange={props.onSelectStorage}
          checked={props.storage === '256'}
        />
        <Form.Radio
          label="512"
          value="512"
          name="storage"
          onChange={props.onSelectStorage}
          checked={props.storage === '512'}
        />
      </Form.Group>
      <Form.Group inline>
        <label>Memory (GB)</label>
        <Form.Radio
          label="4"
          value="4"
          name="memory"
          onChange={props.onSelectMemory}
          checked={props.memory === '4'}
        />
        <Form.Radio
          label="8"
          value="8"
          name="memory"
          onChange={props.onSelectMemory}
          checked={props.memory === '8'}
        />
        <Form.Radio
          label="16"
          value="16"
          name="memory"
          onChange={props.onSelectMemory}
          checked={props.memory === '16'}
        />
      </Form.Group>
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
