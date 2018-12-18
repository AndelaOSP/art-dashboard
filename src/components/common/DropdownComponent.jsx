import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DropdownComponent = props => (
  <Dropdown
    id={props.id}
    fluid
    search
    selection
    upward={props.upward}
    value={props.value}
    label={props.label}
    options={props.options}
    placeholder={props.placeholder}
    name={props.name}
    onChange={props.onChange}
    className={props.customClass}
  />
);

DropdownComponent.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  customClass: PropTypes.string,
  upward: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
};

DropdownComponent.defaultProps = {
  id: '',
  label: '',
  placeholder: '',
  onChange: () => {},
  customClass: '',
  value: 10,
  name: '',
  upward: true
};

export default DropdownComponent;
