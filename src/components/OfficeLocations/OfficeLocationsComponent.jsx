import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Table } from 'semantic-ui-react';

import DropdownComponent from '../common/DropdownComponent';

import generateDropdownOptions from '../../_utils/generateDropdownOptions';
import verifySuperAdmin from '../../_utils/verifySuperAdmin';

export default class OfficeLocations extends Component {
  state = {
    show: false,
    location: this.props.location
  };

  componentDidMount() {
    if (this.props.shouldFetchLocations) {
      this.props.loadOfficeLocations();
    }
  }

  handleChange = (event, data) => {
    event.stopPropagation();

    this.setState({
      location: data.value
    });
  };

  toggleFormVisibility = () => {
    this.setState({
      show: !this.state.show
    });
  };

  updateLocation = () => {
    const { assetDetail, updateAsset, uuid } = this.props;
    const { asset_code, model_number, serial_number } = assetDetail;

    updateAsset(uuid, {
      asset_location: this.state.location,
      model_number,
      asset_code,
      serial_number
    }).then(() => {
      this.toggleFormVisibility();
    });
  };

  render() {
    const { assetDetail, updateLoading, locationLoading, locationList } = this.props;
    const { location, show } = this.state;

    if (!show) {
      return (
        <Table.Row>
          <Table.Cell className="details-headings">Location</Table.Cell>
          <Table.Cell>
            {location || assetDetail.asset_location}
            {verifySuperAdmin() && (
              <Icon
                name="edit"
                className="asset-detail__table__icon"
                onClick={this.toggleFormVisibility}
              />
            )}
          </Table.Cell>
        </Table.Row>
      );
    }

    return (
      <Table.Row>
        <Table.Cell className="details-headings">Location</Table.Cell>
        <Table.Cell>
          <Form loading={updateLoading || locationLoading}>
            {!locationLoading && (
              <DropdownComponent
                customClass="form-dropdown asset-detail__table__dropdown"
                label="Location"
                options={generateDropdownOptions(locationList)}
                placeholder="Select Asset Location"
                name="assetLocation"
                value={location || assetDetail.asset_location}
                onChange={this.handleChange}
                upward={false}
              />
            )}

            <Icon
              name="close"
              className="asset-detail__table__icon"
              onClick={this.toggleFormVisibility}
            />

            <Icon
              name="save"
              className="asset-detail__table__icon"
              onClick={this.updateLocation}
            />
          </Form>
        </Table.Cell>
      </Table.Row>
    );
  }
}

OfficeLocations.propTypes = {
  locationList: PropTypes.array,
  locationLoading: PropTypes.bool,
  updateLoading: PropTypes.bool,
  shouldFetchLocations: PropTypes.bool,
  loadOfficeLocations: PropTypes.func,
  updateAsset: PropTypes.func,
  assetDetail: PropTypes.object,
  uuid: PropTypes.string,
  location: PropTypes.string
};
