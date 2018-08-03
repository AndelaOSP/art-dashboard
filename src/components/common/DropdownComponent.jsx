import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DropdownComponent = props => (
  <Dropdown
    id={props.id}
    style={{ width: '65%' }}
    fluid
    search
    selection
    upward
    label={props.label}
    options={props.options}
    placeholder={props.placeHolder}
    name={props.name}
    onChange={props.onChange}
  />
);

DropdownComponent.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired
};

DropdownComponent.defaultProps = {
  id: '',
  label: '',
  placeHolder: '',
  onChange: () => {}
};

export default DropdownComponent;
