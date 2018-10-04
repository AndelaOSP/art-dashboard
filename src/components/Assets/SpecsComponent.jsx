import PropTypes from 'prop-types';
import * as React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import range from 'lodash/range';
import DropdownComponent from '../common/DropdownComponent';
import ArtButton from '../common/ButtonComponent';

import '../../_css/AddAssetComponent.css';

class SpecsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specs: props.specs
    };
  }

  generateYearRange = () => {
    const currentYear = new Date().getFullYear();
    const firstYearToConsider = 2011;

    return range(currentYear, firstYearToConsider);
  };

  generateYearOptions = () => this.generateYearRange().map(year => ({
    key: year,
    text: year,
    value: year
  }));

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
    const screenSizes = [13, 15, 17];
    const storageSizes = [126, 256, 512];
    const memorySizes = [4, 8, 16];
    const processorTypes = ['Intel core i3', 'Intel core i5', 'Intel core i7'];
    const processorSpeeds = [1.8, 2.3, 3.0, 3.4];

    return (
      <React.Fragment>
        <div className="optional-label-text">
          <p>The fields in this section are optional</p>
        </div>

        <div className="label-style">
          Year Of Manufacture
        </div>

        <Form onSubmit={this.props.onCreateAsset} className="add-asset-form">
          <DropdownComponent
            name="year"
            value={this.state.specs.year}
            options={this.generateYearOptions()}
            placeholder="Select Year Of Manufacture"
            onChange={this.onSelectYearOfManufacture}
            customClass="form-dropdown add-asset-dropdown"
            upward={false}
          />

          <div className="label-style">Screen Size (inches)</div>
          <Form.Group id="screen-size" widths="equal" className="radio-group">
            {
              screenSizes.map(val => (
                <Form.Radio
                  label={val}
                  value={val}
                  name="screenSize"
                  onChange={this.handleRadioChanges}
                  checked={this.state.specs.screenSize === val}
                />
              ))
            }
          </Form.Group>

          <div className="label-style">Storage (GB)</div>
          <Form.Group id="storage" widths="equal" className="radio-group">
            {
              storageSizes.map(val => (
                <Form.Radio
                  label={val}
                  value={val}
                  name="storage"
                  onChange={this.handleRadioChanges}
                  checked={this.state.specs.storage === val}
                />
              ))
            }
          </Form.Group>

          <div className="label-style">Memory (GB)</div>
          <Form.Group id="memory" widths="equal" className="radio-group">
            {
              memorySizes.map(val => (
                <Form.Radio
                  label={val}
                  value={val}
                  name="memory"
                  onChange={this.handleRadioChanges}
                  checked={this.state.specs.memory === val}
                />
              ))
            }
          </Form.Group>

          <div className="label-style">Processor Type (Intel)</div>
          <Form.Group id="processor-type" widths="equal" className="radio-group">
            {
              processorTypes.map(val => (
                <Form.Radio
                  label={val}
                  value={val}
                  name="processorType"
                  onChange={this.handleRadioChanges}
                  checked={this.state.specs.processorType === val}
                />
              ))
            }
          </Form.Group>

          <div className="label-style">Processor Speed (GHz)</div>
          <Form.Group id="processor-speed" widths="equal" className="radio-group">
            {
              processorSpeeds.map(val => (
                <Form.Radio
                  label={val}
                  value={val}
                  name="processorSpeed"
                  onChange={this.handleRadioChanges}
                  checked={this.state.specs.processorSpeed === val}
                />
              ))
            }
          </Form.Group>

          <Grid columns={2}>
            <Grid.Column>
              <ArtButton
                customCss="previous-button"
                buttonName="Previous"
                handleClick={this.props.goBack}
                fluidState
              />
            </Grid.Column>

            <Grid.Column>
              <ArtButton
                className="save"
                buttonName="save"
                color="primary"
                handleClick={this.props.onChangeButtonState}
                buttonState={this.props.buttonLoading}
                disabledState={this.props.isDisabled || this.props.buttonLoading}
                fluidState
              />
            </Grid.Column>
          </Grid>
        </Form>
      </React.Fragment>
    );
  }
}

SpecsComponent.propTypes = {
  pickRadioValuesFromSpecsComponent: PropTypes.func.isRequired,
  onChangeButtonState: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  onCreateAsset: PropTypes.func.isRequired,
  buttonLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  specs: PropTypes.object
};

SpecsComponent.defaultTypes = {
  specs: {
    processorType: '',
    processorSpeed: '',
    screenSize: '',
    storage: '',
    memory: '',
    year: ''
  }
};

export default SpecsComponent;
