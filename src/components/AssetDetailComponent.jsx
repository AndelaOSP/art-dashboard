import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _, { isEmpty, values } from 'lodash';
import { Container, Header } from 'semantic-ui-react';
import { getAssetDetail } from '../_actions/asset.actions';
import { loadDropDownUsers } from '../_actions/users.actions';
import { allocateAsset } from '../_actions/allocations.actions';
import AssetDetailContent from './AssetDetailContent';
import NavbarComponent from './NavBarComponent';

export class AssetDetailComponent extends Component {
  state = {
    assignedUser: {},
    selectedUser: ''
  }

  componentDidMount() {
    this.getAssetId(this.props.location.pathname);
    if (_.isEmpty(this.props.users)) {
      this.props.loadDropDownUsers();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (!isEmpty(values(nextProps.assetDetail.assigned_to))) {
      return {
        assignedUser: nextProps.assetDetail.assigned_to
      };
    }
    if (!isEmpty(values(nextProps.allAllocations))) {
      return {
        assignedUser: { email: nextProps.allAllocations.current_owner }
      };
    }
    return null;
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
  }

  onSelectUserEmail = (event, data) => {
    this.setState({ selectedUser: data.value });
  }

  handleSubmit = () => {
    const { selectedUser } = this.state;
    const { id } = this.props.assetDetail;
    const assetAllocated = {
      asset: id,
      current_owner: selectedUser
    };
    this.props.allocateAsset(assetAllocated);
  }

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
            handleSubmit={this.handleSubmit}
          />
        </Container >
      </NavbarComponent>
    );
  }
}

AssetDetailComponent.propTypes = {
  loadDropDownUsers: PropTypes.func,
  allocateAsset: PropTypes.func,
  assetDetail: PropTypes.object,
  getAssetDetail: PropTypes.func,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  location: PropTypes.object,
  users: PropTypes.array,
  allAllocations: PropTypes.object
};

const mapStateToProps = ({ asset, usersList, allocationsList }) => {
  const { assetDetail, errorMessage, hasError, isLoading } = asset;
  const { allAllocations } = allocationsList;
  const { users } = usersList;
  return {
    users,
    assetDetail,
    allAllocations,
    errorMessage,
    hasError,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getAssetDetail, loadDropDownUsers, allocateAsset
})(AssetDetailComponent);
