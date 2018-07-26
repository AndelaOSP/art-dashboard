import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _, { isEmpty, values } from 'lodash';
import { Container, Header } from 'semantic-ui-react';
import { getAssetDetail, allocateAsset, UnassignAsset } from '../_actions/asset.actions';
import { loadDropDownUsers } from '../_actions/users.actions';
import AssetDetailContent from './AssetDetailContent';
import NavbarComponent from './NavBarComponent';

export class AssetDetailComponent extends Component {
  state = {
    assignedUser: {},
    selectedUser: '',
    serialNumber: '',
    open: false,
    buttonLoadingState: false
  }

  componentDidMount() {
    this.getAssetId(this.props.location.pathname);
    if (_.isEmpty(this.props.users)) {
      this.props.loadDropDownUsers();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      assignedUser: nextProps.assetDetail.assigned_to,
      buttonLoadingState: false,
      open: false
    };
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.hasError &&
      (this.props.errorMessage === nextProps.errorMessage)
    ) {
      return false;
    }
    return true;
  }

  getAssetId(pathName) {
    const stringArray = pathName.split('/');
    const serialNumber = stringArray[2];
    this.props.getAssetDetail(serialNumber);
    this.setState({ serialNumber });
  }

  onSelectUserEmail = (event, data) => {
    this.setState({ selectedUser: data.value });
  }

  handleAssign = () => {
    const { selectedUser } = this.state;
    const { id } = this.props.assetDetail;
    const assetAllocated = {
      asset: id,
      current_owner: selectedUser
    };
    this.props.allocateAsset(assetAllocated, this.state.serialNumber);

    if (this.state.buttonLoadingState) this.setState({ open: false });
  }

  handleUnassign = () => {
    const { id } = this.props.assetDetail;
    const assetAssigned = {
      asset: id,
      current_status: 'Available'
    };
    this.props.UnassignAsset(assetAssigned, this.state.serialNumber);

    if (this.state.buttonLoadingState) this.setState({ open: false });
  }

  show = () => this.setState({ open: true })

  handleConfirm = (event) => {
    event.preventDefault();
    this.setState({ buttonLoadingState: !this.state.buttonLoadingState });

    if (isEmpty(values(this.state.assignedUser))) {
      return this.handleAssign;
    }
    return this.handleUnassign;
  };

  handleCancel = () => this.setState({ open: false })

  render() {
    return (
      <NavbarComponent>
        <Container>
          <Header as="h1" content="Asset Detail" className="asset-detail-header" />
          <AssetDetailContent
            {...this.props}
            assetDetail={this.props.assetDetail}
            assignedUser={this.state.assignedUser}
            errorMessage={this.props.errorMessage}
            hasError={this.props.hasError}
            isLoading={this.props.isLoading}
            onSelectUserEmail={this.onSelectUserEmail}
            handleAssign={this.handleAssign}
            handleUnassign={this.handleUnassign}
            open={this.state.open}
            show={this.show}
            handleConfirm={this.handleConfirm}
            handleCancel={this.handleCancel}
            buttonState={this.state.buttonLoadingState}
          />
        </Container>
      </NavbarComponent>
    );
  }
}

AssetDetailComponent.propTypes = {
  loadDropDownUsers: PropTypes.func,
  allocateAsset: PropTypes.func,
  UnassignAsset: PropTypes.func,
  assetDetail: PropTypes.object,
  getAssetDetail: PropTypes.func,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  location: PropTypes.object,
  users: PropTypes.array,
  newAllocation: PropTypes.object,
  unAssignedAsset: PropTypes.object
};

const mapStateToProps = ({ asset, usersList }) => {
  const {
    assetDetail, errorMessage, hasError,
    isLoading, newAllocation, unAssignedAsset
  } = asset;
  const { users } = usersList;
  return {
    users,
    assetDetail,
    newAllocation,
    unAssignedAsset,
    errorMessage,
    hasError,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getAssetDetail, loadDropDownUsers, allocateAsset, UnassignAsset
})(AssetDetailComponent);
