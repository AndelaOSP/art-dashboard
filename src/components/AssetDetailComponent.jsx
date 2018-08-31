import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _, { isEmpty, values } from 'lodash';
import { Container, Header } from 'semantic-ui-react';
import { getAssetDetail, allocateAsset, unassignAsset } from '../_actions/asset.actions';
import { loadDropDownUsers } from '../_actions/users.actions';
import AssetDetailContent from './AssetDetailContent';
import NavbarComponent from './NavBarComponent';

export class AssetDetailComponent extends Component {
  state = {
    assignedUser: {},
    selectedUser: 0,
    serialNumber: '',
    saveButtonState: false,
    assignAssetButtonState: true,
    hasError: this.props.hasError,
    errorMessage: this.props.errorMessage
  };

  componentDidMount() {
    this.getAssetId(this.props.location.pathname);
    if (_.isEmpty(this.props.usersDropdown)) {
      this.props.loadDropDownUsers();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      assignedUser: nextProps.assetDetail.assigned_to,
      saveButtonState: nextProps.buttonLoading,
      hasError: nextProps.hasError,
      errorMessage: nextProps.errorMessage
    };
  }

  getAssetId(pathName) {
    const stringArray = pathName.split('/');
    const serialNumber = stringArray[2];
    this.setState({ serialNumber });
    this.props.getAssetDetail(serialNumber);
  }

  onSelectUserEmail = (event, data) => {
    this.setState({ selectedUser: data.value, assignAssetButtonState: false });
  };

  handleAssign = () => {
    const { selectedUser } = this.state;
    const { id } = this.props.assetDetail;
    const assetAllocated = {
      asset: id,
      current_owner: selectedUser
    };
    this.props.allocateAsset(assetAllocated, this.state.serialNumber);

    if (!this.props.buttonLoading) this.setState({ saveButtonState: !this.state.saveButtonState });
  };

  handleUnassign = () => {
    const { id } = this.props.assetDetail;
    const assetAssigned = {
      asset: id,
      current_status: 'Available'
    };
    this.props.unassignAsset(assetAssigned, this.state.serialNumber);

    if (!this.props.buttonLoading) this.setState({ saveButtonState: !this.state.saveButtonState });
  };

  handleConfirm = () => {
    if (isEmpty(values(this.state.assignedUser))) {
      return this.handleAssign();
    }
    return this.handleUnassign();
  };

  render() {
    return (
      <NavbarComponent>
        <Container>
          <Header as="h1" content="Asset Detail" className="asset-detail-header" />
          <AssetDetailContent
            {...this.props}
            assetDetail={this.props.assetDetail}
            assignedUser={this.state.assignedUser}
            errorMessage={this.state.errorMessage}
            hasError={this.state.hasError}
            isLoading={this.props.isLoading}
            onSelectUserEmail={this.onSelectUserEmail}
            handleAssign={this.handleAssign}
            handleUnassign={this.handleUnassign}
            open={this.state.open}
            selectedUserId={this.state.selectedUser}
            show={this.show}
            handleConfirm={this.handleConfirm}
            handleCancel={this.handleCancel}
            buttonState={this.props.buttonLoading}
            assignAssetButtonState={this.state.assignAssetButtonState}
            selectedUser={this.state.selectedUser}
            users={this.props.usersDropdown}
          />
        </Container>
      </NavbarComponent>
    );
  }
}

AssetDetailComponent.propTypes = {
  loadDropDownUsers: PropTypes.func,
  allocateAsset: PropTypes.func,
  unassignAsset: PropTypes.func,
  assetDetail: PropTypes.object,
  getAssetDetail: PropTypes.func,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.object,
  buttonLoading: PropTypes.bool,
  location: PropTypes.object,
  usersDropdown: PropTypes.array,
  newAllocation: PropTypes.object,
  unAssignedAsset: PropTypes.object
};

const mapStateToProps = ({ asset, usersList }) => {
  const {
    assetDetail,
    errorMessage,
    hasError,
    newAllocation,
    unAssignedAsset,
    buttonLoading
  } = asset;
  const { usersDropdown } = usersList;
  const isLoading = {
    assetsLoading: asset.isLoading,
    usersLoading: usersList.isLoading
  };
  return {
    usersDropdown,
    assetDetail,
    newAllocation,
    unAssignedAsset,
    errorMessage,
    hasError,
    isLoading,
    buttonLoading
  };
};

export default connect(mapStateToProps, {
  getAssetDetail, loadDropDownUsers, allocateAsset, unassignAsset
})(AssetDetailComponent);
