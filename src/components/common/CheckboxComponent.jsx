import React from 'react';
import PropTypes from 'prop-types';

import '../../_css/CheckboxComponent.css';

const CheckboxComponent = ({
  isChecked = false,
  label,
  name,
  handleCheckboxChange,
  disabled,
  customClass
}) => (
  <div className="field">
    <div className="ui checkbox">
      <input
        type="checkbox"
        name={name}
        disabled={disabled}
        value={label}
        onChange={handleCheckboxChange}
        checked={isChecked}
        className={customClass}
      />
      <label className="check label">{label}</label>
    </div>
  </div>
);

CheckboxComponent.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  handleCheckboxChange: PropTypes.func,
  disabled: PropTypes.bool,
  customClass: PropTypes.string
};

export default CheckboxComponent;
