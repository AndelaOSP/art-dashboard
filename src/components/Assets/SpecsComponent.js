import PropTypes from 'prop-types';
import * as React from 'react';
import { Form } from 'semantic-ui-react';
import DropdownComponent from '../common/DropdownComponent';
import '../../_css/AddAssetComponent.css';

const numberOfYears = () => (
  (new Date()).getFullYear() - 2012
);

const yearOfManufacture = Array(numberOfYears()).fill({}).map((value, index) => ({
  key: index,
  text: 2013 + index,
  value: 2013 + index
}));

const SpecsComponent = props => (
  <div>
    <label className="label-style">Year Of Manufacture</label>
    <DropdownComponent
      className="input-style"
      placeholder="Enter Year Of Manufacture"
      name="year"
      options={yearOfManufacture}
      onChange={props.onSelectYearOfManufacture}
    />
    <label className="label-style">Processor Type (Intel)</label>
    <Form.Group inline>
      <Form.Radio
        label="Core i3"
        value="Intel core i3"
        name="processorType"
        onChange={props.handleRadioChanges}
        checked={props.specs.processorType === 'Intel core i3'}
      />
      <Form.Radio
        label="Core i5"
        value="Intel core i5"
        name="processorType"
        onChange={props.handleRadioChanges}
        checked={props.specs.processorType === 'Intel core i5'}
      />
      <Form.Radio
        label="Core i7"
        value="Intel core i7"
        name="processorType"
        onChange={props.handleRadioChanges}
        checked={props.specs.processorType === 'Intel core i7'}
      />
    </Form.Group>
    <label className="label-style">Processor Speed (GHz)</label>
    <Form.Group inline>
      <Form.Radio
        label="1.8"
        value="1.8"
        name="processorSpeed"
        onChange={props.handleRadioChanges}
        checked={props.specs.processorSpeed === '1.8'}
      />
      <Form.Radio
        label="2.3"
        value="2.3"
        name="processorSpeed"
        onChange={props.handleRadioChanges}
        checked={props.specs.processorSpeed === '2.3'}
      />
      <Form.Radio
        label="3.0"
        value="3.0"
        name="processorSpeed"
        onChange={props.handleRadioChanges}
        checked={props.specs.processorSpeed === '3.0'}
      />
      <Form.Radio
        label="3.4"
        value="3.4"
        name="processorSpeed"
        onChange={props.handleRadioChanges}
        checked={props.specs.processorSpeed === '3.4'}
      />
    </Form.Group>
    <label className="label-style">Screen Size (inches)</label>
    <Form.Group inline>
      <Form.Radio
        label="13"
        value="13"
        name="screenSize"
        onChange={props.handleRadioChanges}
        checked={props.specs.screenSize === '13'}
      />
      <Form.Radio
        label="15"
        value="15"
        name="screenSize"
        onChange={props.handleRadioChanges}
        checked={props.specs.screenSize === '15'}
      />
      <Form.Radio
        label="27"
        value="17"
        name="screenSize"
        onChange={props.handleRadioChanges}
        checked={props.specs.screenSize === '17'}
      />
    </Form.Group>
    <label className="label-style">Storage (GB)</label>
    <Form.Group inline>
      <Form.Radio
        label="128"
        value="128"
        name="storage"
        onChange={props.handleRadioChanges}
        checked={props.specs.storage === '128'}
      />
      <Form.Radio
        label="256"
        value="256"
        name="storage"
        onChange={props.handleRadioChanges}
        checked={props.specs.storage === '256'}
      />
      <Form.Radio
        label="512"
        value="512"
        name="storage"
        onChange={props.handleRadioChanges}
        checked={props.specs.storage === '512'}
      />
    </Form.Group>
    <label className="label-style">Memory (GB)</label>
    <Form.Group inline>
      <Form.Radio
        label="4"
        value="4"
        name="memory"
        onChange={props.handleRadioChanges}
        checked={props.specs.memory === '4'}
      />
      <Form.Radio
        label="8"
        value="8"
        name="memory"
        onChange={props.handleRadioChanges}
        checked={props.specs.memory === '8'}
      />
      <Form.Radio
        label="16"
        value="16"
        name="memory"
        onChange={props.handleRadioChanges}
        checked={props.specs.memory === '16'}
      />
    </Form.Group>
  </div>
);

SpecsComponent.propTypes = {
  onSelectYearOfManufacture: PropTypes.func.isRequired,
  handleRadioChanges: PropTypes.func.isRequired,
  specs: PropTypes.object
};

SpecsComponent.defaultTypes = {
  specs: {
    processorType: '',
    processorSpeed: '',
    screenSize: '',
    storage: '',
    memory: ''
  }
};

export default SpecsComponent;
