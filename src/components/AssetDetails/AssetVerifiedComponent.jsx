import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Table } from 'semantic-ui-react';

import DropdownComponent from '../common/DropdownComponent';

class AssetVerifiedComponent extends Component {
  state = {
    show: false,
    isChecked: this.props.assetDetail.verified,
    optionText: this.props.assetDetail.verified ? 'Yes' : 'No'
  };

  handleDropdownChange = (event, data) => {
    event.stopPropagation();

    const dropdownValue = data.value === 'Yes';

    this.setState({
      isChecked: dropdownValue,
      optionText: data.value
    });
  };

  toggleFormVisibility = () => {
    this.setState({
      show: !this.state.show
    });
  };

  updateVerifiedStatus = () => {
    const { assetDetail, updateAsset, uuid } = this.props;
    const { asset_code, model_number, serial_number, verified } = assetDetail; // eslint-disable-line

    updateAsset(uuid, {
      model_number,
      asset_code,
      serial_number,
      verified: this.state.isChecked
    }).then(() => {
      this.toggleFormVisibility();
    });
  };

  render() {
    const { updateLoading } = this.props;
    const { show, optionText } = this.state;

    if (!show) {
      return (
        <Table.Row>
          <Table.Cell className="details-headings">Verified</Table.Cell>
          <Table.Cell>
            {optionText}
            <Icon
              name="edit"
              className="asset-detail__table__icon"
              onClick={this.toggleFormVisibility}
            />
          </Table.Cell>
        </Table.Row>
      );
    }

    return (
      <Table.Row>
        <Table.Cell className="details-headings">Verified</Table.Cell>
        <Table.Cell>
          <Form loading={updateLoading}>

            <DropdownComponent
              customClass="form-dropdown asset-detail__table__dropdown"
              label="Verified"
              options={[{ text: 'Yes', value: 'Yes' }, { text: 'No', value: 'No' }]}
              placeholder="Select Verification Status"
              name="assetVerified"
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
              onClick={this.updateVerifiedStatus}
            />

          </Form>
        </Table.Cell>
      </Table.Row>
    );
  }
}

AssetVerifiedComponent.propTypes = {
  updateAsset: PropTypes.func,
  assetDetail: PropTypes.object,
  uuid: PropTypes.string,
  updateLoading: PropTypes.bool
};

export default AssetVerifiedComponent;
