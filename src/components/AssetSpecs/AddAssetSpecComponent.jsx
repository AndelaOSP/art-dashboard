import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'semantic-ui-react';
import range from 'lodash/range';
import generateDropdownOptions from '../../_utils/generateDropdownOptions';
import ArtButton from '../common/ButtonComponent';
import DropdownComponent from '../common/DropdownComponent';
import {
  SCREEN_SIZES,
  STORAGE_SIZES,
  MEMORY_SIZES,
  PROCESSOR_TYPES,
  PROCESSOR_SPEEDS
} from '../../_enums';

const AddAssetSpecComponent = (props) => {
  const generateYearRange = () => {
    const currentYear = new Date().getFullYear();
    const firstYearToConsider = 2013;

    return range(currentYear, firstYearToConsider);
  };

  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Field>
        <label htmlFor="year_of_manufacture" className="label-style">Year of Manufacture</label>
        <DropdownComponent
          customClass="form-dropdown"
          id="year_of_manufacture"
          name="year_of_manufacture"
          value={props.assetSpec.year_of_manufacture}
          options={generateDropdownOptions(generateYearRange())}
          placeholder="Select Year Of Manufacture"
          onChange={props.handleInputChange}
          upward={false}
        />
      </Form.Field>

      <Form.Field>
        <label htmlFor="processor_speed" className="label-style">Processor Speed (GHz)</label>
        <DropdownComponent
          id="processor_speed"
          name="processor_speed"
          value={props.assetSpec.processor_speed}
          options={generateDropdownOptions(PROCESSOR_SPEEDS)}
          placeholder="Select Processor Speed"
          onChange={props.handleInputChange}
          customClass="form-dropdown"
          upward={false}
        />
      </Form.Field>

      <Form.Field>
        <label htmlFor="screen_size" className="label-style">Screen Size (Inches)</label>
        <DropdownComponent
          id="screen_size"
          name="screen_size"
          value={props.assetSpec.screen_size}
          options={generateDropdownOptions(SCREEN_SIZES)}
          placeholder="Select Screen Size"
          onChange={props.handleInputChange}
          customClass="form-dropdown"
          upward={false}
        />
      </Form.Field>

      <Form.Field>
        <label htmlFor="processor_type" className="label-style">Processor Type</label>
        <DropdownComponent
          id="processor_type"
          name="processor_type"
          value={props.assetSpec.processor_type}
          options={generateDropdownOptions(PROCESSOR_TYPES)}
          placeholder="Select Processor Type"
          onChange={props.handleInputChange}
          customClass="form-dropdown"
          upward={false}
        />
      </Form.Field>

      <Form.Field>
        <label htmlFor="storage" className="label-style">Storage Size (GB)</label>
        <DropdownComponent
          id="storage"
          name="storage"
          value={props.assetSpec.storage}
          options={generateDropdownOptions(STORAGE_SIZES)}
          placeholder="Select Storage Size"
          onChange={props.handleInputChange}
          customClass="form-dropdown"
          upward={false}
        />
      </Form.Field>

      <Form.Field>
        <label htmlFor="memory" className="label-style">Memory Size (GB)</label>
        <DropdownComponent
          id="memory"
          name="memory"
          value={props.assetSpec.memory}
          options={generateDropdownOptions(MEMORY_SIZES)}
          placeholder="Select Memory Size"
          onChange={props.handleInputChange}
          customClass="form-dropdown"
          upward={false}
        />
      </Form.Field>

      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <ArtButton
              className="cancel"
              buttonName="Cancel"
              handleClick={props.toggleModal}
              fluidState
            />
          </Grid.Column>

          <Grid.Column>
            <ArtButton
              className="save"
              buttonName="Save"
              color="primary"
              handleClick={props.handleSubmit}
              buttonState={props.isLoading}
              fluidState
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

AddAssetSpecComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  assetSpec: PropTypes.object,
  isLoading: PropTypes.bool
};

AddAssetSpecComponent.defaultProps = {
  assetSpec: {},
  isLoading: false
};

export default AddAssetSpecComponent;
