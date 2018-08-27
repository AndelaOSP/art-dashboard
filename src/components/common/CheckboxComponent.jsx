import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckboxComponent extends Component {
  state = {
    isChecked: false
  };

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked
      }
    ));

    handleCheckboxChange(label);
  };

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="field">
        <div className="ui checkbox">
          <input
            type="checkbox"
            name={label}
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          <label>{label}</label>
        </div>
      </div>
    );
  }
}

CheckboxComponent.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired
};

export default CheckboxComponent;
