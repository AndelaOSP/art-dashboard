import PropTypes from 'prop-types';
import * as React from 'react';
import { Form } from 'semantic-ui-react';
import DropdownComponent from '../common/DropdownComponent';
import ArtButton from '../common/ButtonComponent';

import '../../_css/AddAssetComponent.css';

const numberOfYears = () => (
  (new Date()).getFullYear() - 2012
);

const yearOfManufacture = Array(numberOfYears()).fill({}).map((value, index) => ({
  key: index,
  text: 2013 + index,
  value: 2013 + index
}));

class SpecsComponent2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specs: props.specs
    };
  }

  onSelectYearOfManufacture = (event, data) => {
    const specs = { ...this.state.specs };
    specs.year = data.value;
    this.setState({ specs });
    this.props.pickRadioValuesFromSpecsComponent(specs);
  };

  handleRadioChanges = (event, data) => {
    const { name, value } = data;
    const specs = { ...this.state.specs };
    if (name === 'processorType') {
      specs.processorType = value;
    } else if (name === 'processorSpeed') {
      specs.processorSpeed = value;
    } else if (name === 'screenSize') {
      specs.screenSize = value;
    } else if (name === 'storage') {
      specs.storage = value;
    } else if (name === 'memory') {
      specs.memory = value;
    }
    this.setState({ specs });
    this.props.pickRadioValuesFromSpecsComponent(specs);
  };

  render() {
    return (
      <React.Fragment>
        <div className="optional-label-text">
          <label>Optional Fields</label>
        </div>

        <div className="optional-label-text">
          <label>Year Of Manufacture</label>
        </div>

        <Form onSubmit={this.props.onCreateAsset} className="add-asset-form">
          <DropdownComponent
            placeholder="Enter Year Of Manufacture"
            name="year"
            value={this.state.specs.year}
            options={yearOfManufacture}
            onChange={this.onSelectYearOfManufacture}
            customClass="input-style add-asset-dropdown"
            upward={false}
          />

          <Form.Group inline>
            <label>Screen Size (inches)</label>
            <Form.Radio
              label="13"
              value="13"
              name="screenSize"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.screenSize === '13'}
            />
            <Form.Radio
              label="15"
              value="15"
              name="screenSize"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.screenSize === '15'}
            />
            <Form.Radio
              label="27"
              value="17"
              name="screenSize"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.screenSize === '17'}
            />
          </Form.Group>

          <Form.Group inline>
            <label>Storage (GB)</label>
            <Form.Radio
              label="128"
              value="128"
              name="storage"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.storage === '128'}
            />
            <Form.Radio
              label="256"
              value="256"
              name="storage"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.storage === '256'}
            />
            <Form.Radio
              label="512"
              value="512"
              name="storage"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.storage === '512'}
            />
          </Form.Group>

          <Form.Group inline>
            <label>Memory (GB)</label>
            <Form.Radio
              label="4"
              value="4"
              name="memory"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.memory === '4'}
            />
            <Form.Radio
              label="8"
              value="8"
              name="memory"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.memory === '8'}
            />
            <Form.Radio
              label="16"
              value="16"
              name="memory"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.memory === '16'}
            />
          </Form.Group>

          <Form.Group inline>
            <label>Processor Type (Intel)</label>
            <Form.Radio
              label="Core i3"
              value="Intel core i3"
              name="processorType"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.processorType === 'Intel core i3'}
            />
            <Form.Radio
              label="Core i5"
              value="Intel core i5"
              name="processorType"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.processorType === 'Intel core i5'}
            />
            <Form.Radio
              label="Core i7"
              value="Intel core i7"
              name="processorType"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.processorType === 'Intel core i7'}
            />
          </Form.Group>

          <Form.Group inline id="processor-speed">
            <label>Processor Speed (GHz)</label>
            <Form.Radio
              label="1.8"
              value="1.8"
              name="processorSpeed"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.processorSpeed === '1.8'}
            />
            <Form.Radio
              label="2.3"
              value="2.3"
              name="processorSpeed"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.processorSpeed === '2.3'}
            />
            <Form.Radio
              label="3.0"
              value="3.0"
              name="processorSpeed"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.processorSpeed === '3.0'}
            />
            <Form.Radio
              label="3.4"
              value="3.4"
              name="processorSpeed"
              onChange={this.handleRadioChanges}
              checked={this.state.specs.processorSpeed === '3.4'}
            />
          </Form.Group>

          <ArtButton
            customCss="previous-button"
            buttonName="Previous"
            handleClick={this.props.goBack}
          />

          <ArtButton
            className="save"
            buttonName="save"
            color="primary"
            handleClick={this.props.onChangeButtonState}
            buttonState={this.props.buttonState}
          />
        </Form>
      </React.Fragment>
    );
  }
}

SpecsComponent2.propTypes = {
  pickRadioValuesFromSpecsComponent: PropTypes.func.isRequired,
  onChangeButtonState: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  onCreateAsset: PropTypes.func.isRequired,
  buttonState: PropTypes.bool,
  specs: PropTypes.object
};

SpecsComponent2.defaultTypes = {
  specs: {
    processorType: '',
    processorSpeed: '',
    screenSize: '',
    storage: '',
    memory: '',
    year: ''
  },
  buttonState: false
};

export default SpecsComponent2;
