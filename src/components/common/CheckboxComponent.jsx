import React from 'react';
import PropTypes from 'prop-types';

import '../../_css/CheckboxComponent.css';

const CheckboxComponent = ({ isChecked = false, label, name, handleCheckboxChange }) => (
  <div className="field">
    <div className="ui checkbox">
      <input
        type="checkbox"
        name={name}
        value={label}
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
      <label className="check label">{label}</label>
    </div>
  </div>
);

CheckboxComponent.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  handleCheckboxChange: PropTypes.func
};

export default CheckboxComponent;
