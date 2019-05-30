import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Table } from 'semantic-ui-react';

import DropdownComponent from '../common/DropdownComponent';

import '../../_css/AssetDetailsComponent.css';

class EditableUserDetailsComponent extends Component {
  state = {
    editIconClicked: false,
    optionText: this.props.userDetail.is_staff ? 'Yes' : 'No'
  };

  handleDropdownChange = (event, data) => {
    event.stopPropagation();

    this.setState({
      optionText: data.value
    });
  };

  toggleFormVisibility = () => {
    this.setState({
      editIconClicked: !this.state.editIconClicked
    });
  };

  updateUserStatus = async () => {
    const { userDetail, updateUserDetail } = this.props;
    userDetail.is_staff = (this.state.optionText === 'Yes');
    await updateUserDetail(userDetail);
    this.setState({ editIconClicked: false });
  };

  render() {
    const { isLoading } = this.props;
    const { editIconClicked, optionText } = this.state;

    if (!editIconClicked) {
      return (
        <Table>
          <Table.Body>
            <Table.Row className="is-admin-wrapper">
              <Table.Cell>Staff</Table.Cell>
              <Table.Cell className="is-admin">
                {optionText}
                <Icon
                  name="edit"
                  className="asset-detail__table__icon is-admin"
                  onClick={this.toggleFormVisibility}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    }

    return (
      <Table>
        <Table.Body>
          <Table.Row >
            <Table.Cell className="is-admin-wrapper details-headings">Staff</Table.Cell>
            <Table.Cell className="is-admin">
              <Form loading={isLoading}>

                <DropdownComponent
                  customClass="form-dropdown asset-detail__table__dropdown"
                  options={[{ text: 'Yes', value: 'Yes' }, { text: 'No', value: 'No' }]}
                  value={optionText}
                  onChange={this.handleDropdownChange}
                  upward={false}
                />

                <Icon
                  name="close"
                  className="asset-detail__table__icon"
                  onClick={this.toggleFormVisibility}
                />

                <Icon
                  name="save"
                  className="asset-detail__table__icon"
                  onClick={this.updateUserStatus}
                />

              </Form>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

EditableUserDetailsComponent.propTypes = {
  userDetail: PropTypes.object,
  updateUserDetail: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default EditableUserDetailsComponent;
