import React from 'react';
import PropTypes from 'prop-types';

import '../../_css/CheckboxComponent.css';


const CheckboxComponent = (props) => {
  const { isChecked, label, name, handleCheckboxChange } = props;

  const checkbox = isChecked
    ? <input type="checkbox" name={name} value={label} onChange={handleCheckboxChange} checked />
    : <input type="checkbox" name={name} value={label} onChange={handleCheckboxChange} />;

  return (
    <div className="field">
      <div className="ui checkbox">
        {checkbox}
        <label className="check label">{label}</label>
      </div>
    </div>
  );
};

CheckboxComponent.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired
};

export default CheckboxComponent;
