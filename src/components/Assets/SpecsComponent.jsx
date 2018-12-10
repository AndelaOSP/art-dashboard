import PropTypes from 'prop-types';
import * as React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import range from 'lodash/range';
import uuidv4 from 'uuid/v4';
import DropdownComponent from '../common/DropdownComponent';
import ArtButton from '../common/ButtonComponent';
import generateDropdownOptions from '../../_utils/generateDropdownOptions';
import {
  SCREEN_SIZES,
  STORAGE_SIZES,
  MEMORY_SIZES,
  PROCESSOR_TYPES,
  PROCESSOR_SPEEDS
} from '../../_enums';

import '../../_css/AddAssetComponent.css';

class SpecsComponent extends React.Component {
  generateYearRange = () => {
    const currentYear = new Date().getFullYear();
    const firstYearToConsider = 2011;

    return range(currentYear, firstYearToConsider);
  };

  handleChange = (event, data) => {
    const { name, value } = data;

    this.props.pickRadioValuesFromSpecsComponent({
      [name]: value
    });
  };

  render() {
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
            value={this.props.specs.year}
            options={generateDropdownOptions(this.generateYearRange())}
            placeholder="Select Year Of Manufacture"
            onChange={this.handleChange}
            customClass="form-dropdown add-asset-dropdown"
            upward={false}
          />

          <div className="label-style">Screen Size (inches)</div>
          <Form.Group id="screen-size" widths="equal" className="radio-group">
            {
              SCREEN_SIZES.map(val => (
                <Form.Radio
                  key={uuidv4()}
                  label={val}
                  value={val}
                  name="screenSize"
                  onChange={this.handleChange}
                  checked={this.props.specs.screenSize === val}
                />
              ))
            }
          </Form.Group>

          <div className="label-style">Storage (GB)</div>
          <Form.Group id="storage" widths="equal" className="radio-group">
            {
              STORAGE_SIZES.map(val => (
                <Form.Radio
                  key={uuidv4()}
                  label={val}
                  value={val}
                  name="storage"
                  onChange={this.handleChange}
                  checked={this.props.specs.storage === val}
                />
              ))
            }
          </Form.Group>

          <div className="label-style">Memory (GB)</div>
          <Form.Group id="memory" widths="equal" className="radio-group">
            {
              MEMORY_SIZES.map(val => (
                <Form.Radio
                  key={uuidv4()}
                  label={val}
                  value={val}
                  name="memory"
                  onChange={this.handleChange}
                  checked={this.props.specs.memory === val}
                />
              ))
            }
          </Form.Group>

          <div className="label-style">Processor Type (Intel)</div>
          <Form.Group id="processor-type" widths="equal" className="radio-group">
            {
              PROCESSOR_TYPES.map(val => (
                <Form.Radio
                  key={uuidv4()}
                  label={val}
                  value={val}
                  name="processorType"
                  onChange={this.handleChange}
                  checked={this.props.specs.processorType === val}
                />
              ))
            }
          </Form.Group>

          <div className="label-style">Processor Speed (GHz)</div>
          <Form.Group id="processor-speed" widths="equal" className="radio-group">
            {
              PROCESSOR_SPEEDS.map(val => (
                <Form.Radio
                  key={uuidv4()}
                  label={val}
                  value={val}
                  name="processorSpeed"
                  onChange={this.handleChange}
                  checked={this.props.specs.processorSpeed === val}
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
                buttonState={this.props.buttonLoading}
                disabledState={this.props.isDisabled || this.props.buttonLoading}
                handleClick={this.props.reset}
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
  goBack: PropTypes.func.isRequired,
  onCreateAsset: PropTypes.func.isRequired,
  buttonLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  specs: PropTypes.object,
  reset: PropTypes.func
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
