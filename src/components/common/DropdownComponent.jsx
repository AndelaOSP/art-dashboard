import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DropdownComponent = props => (
  <Dropdown
    id={props.id}
    fluid
    search
    selection
    upward
    value={props.value}
    label={props.label}
    options={props.options}
    placeholder={props.placeHolder}
    name={props.name}
    onChange={props.onChange}
    className={props.customCss}
  />
);

DropdownComponent.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  customCss: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

DropdownComponent.defaultProps = {
  id: '',
  label: '',
  placeHolder: '',
  onChange: () => {},
  customCss: ''
  value: 10
};

export default DropdownComponent;
