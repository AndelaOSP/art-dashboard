import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../_css/CheckboxComponent.css';

class CheckboxComponent extends Component {
  state = {
    isChecked: this.props.keepCheckboxChecked(this.props.label, this.props.name) || false
  };

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label, name } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));

    handleCheckboxChange(label, name);
  };

  render() {
    const { label, name } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="field">
        <div className="ui checkbox">
          <input
            type="checkbox"
            name={name}
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          <label className="check label">{label}</label>
        </div>
      </div>
    );
  }
}

CheckboxComponent.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  keepCheckboxChecked: PropTypes.func.isRequired
};

export default CheckboxComponent;
