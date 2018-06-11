import PropTypes from 'prop-types';
import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';

const AddAssetDropdown = (props) => (
  <Dropdown
    style={{width: '65%'}}
    fluid
    search
    selection
    label={props.label}
    options={props.options}
    placeholder={props.placeHolder}
    name={props.name}
    onChange={props.onChange}
  />
);

AddAssetDropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default AddAssetDropdown;
