import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';

import DropdownComponent from '../common/DropdownComponent';

import '../../_css/IsActiveComponent.css';

class IsActiveComponent extends React.Component {
  state = {
    show: false,
    isActive: this.props.securityUser.is_active,
    optionText: this.props.securityUser.is_active ? 'Yes' : 'No'
  };

  handleDropdownChange = (event, data) => {
    event.stopPropagation();

    const dropdownValue = data.value === 'Yes';

    this.setState({
      isActive: dropdownValue,
      optionText: data.value
    });
  };

  toggleFormVisibility = () => {
    this.setState({
      show: !this.state.show
    });
  };

  updateIsActive = () => {
    const { securityUser } = this.props;
    const { badge_number, email, is_active } = securityUser; // eslint-disable-line

    this.props.updateActiveStatus(securityUser.id, {
      badge_number,
      email,
      is_active: this.state.isActive
    });
  };

  render() {
    const { optionText, show } = this.state;

    if (!show) {
      return (
        <div>
          {optionText}
          <Icon
            name="edit"
            className="asset-detail__table__icon"
            onClick={this.toggleFormVisibility}
          />
        </div>
      );
    }

    return (
      <Form>
        <DropdownComponent
          customClass="form-dropdown asset-detail__table__dropdown"
          label="Active"
          options={[{ text: 'Yes', value: 'Yes' }, { text: 'No', value: 'No' }]}
          placeholder="Select Active Status"
          name="activeStatus"
          value={optionText}
          onChange={this.handleDropdownChange}
          upward={false}
        />
        <div className="is-active-icons">
          <Icon
            name="close"
            className="asset-detail__table__icon"
            onClick={this.toggleFormVisibility}
          />

          <Icon
            name="save"
            className="asset-detail__table__icon"
            onClick={this.updateIsActive}
          />
        </div>
      </Form>
    );
  }
}

IsActiveComponent.propTypes = {
  updateActiveStatus: PropTypes.func,
  securityUser: PropTypes.object
};

export default IsActiveComponent;
