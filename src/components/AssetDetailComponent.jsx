import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Container, Header } from 'semantic-ui-react';
import { getAssetDetail, allocateAsset, unassignAsset } from '../_actions/asset.actions';
import { loadAssetAssigneeUsers } from '../_actions/users.actions';
import AssetDetailContent from './AssetDetailContent';
import NavbarComponent from './NavBarComponent';
import LoaderComponent from './LoaderComponent';

export class AssetDetailComponent extends Component {
  state = {
    serialNumber: '',
    hasError: this.props.hasError,
    errorMessage: this.props.errorMessage
  };

  componentDidMount() {
    const { assetDetail } = this.props;
    if (isEmpty(assetDetail)) {
      this.getAssetId(this.props.location.pathname);
    }
  }


  getAssetId(pathName) {
    const stringArray = pathName.split('/');
    const serialNumber = stringArray[2];
    this.setState({ serialNumber });
    this.props.getAssetDetail(serialNumber);
  }

  render() {
    let renderedComponent;
    if (isEmpty(this.props.assetDetail)) {
      renderedComponent = <LoaderComponent loadingText="Loading" />;
    } else {
      renderedComponent = (<AssetDetailContent
        {...this.props}
        assetDetail={this.props.assetDetail}
        errorMessage={this.state.errorMessage}
        hasError={this.state.hasError}
        isLoading={this.props.isLoading}
        show={this.show}
        handleCancel={this.handleCancel}
        buttonState={this.props.buttonLoading}
        users={this.props.assetAsigneeUsers}
        serialNumber={this.state.serialNumber}
      />);
    }
    return (
      <NavbarComponent>
        <Container>
          <Header as="h1" content="Asset Detail" className="asset-detail-header" />
          { renderedComponent }
        </Container>
      </NavbarComponent>
    );
  }
}

AssetDetailComponent.propTypes = {
  loadAssetAssigneeUsers: PropTypes.func,
  allocateAsset: PropTypes.func,
  unassignAsset: PropTypes.func,
  assetDetail: PropTypes.object,
  getAssetDetail: PropTypes.func,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.object,
  buttonLoading: PropTypes.bool,
  location: PropTypes.object,
  assetAsigneeUsers: PropTypes.array,
  newAllocation: PropTypes.object,
  unAssignedAsset: PropTypes.object
};

const mapStateToProps = ({ asset, usersList }, props) => {
  const {
    assetDetail,
    errorMessage,
    hasError,
    newAllocation,
    unAssignedAsset,
    buttonLoading
  } = asset;
  const { assetAsigneeUsers } = usersList;
  const isLoading = {
    assetsLoading: asset.isLoading,
    usersLoading: usersList.isLoading
  };
  return {
    assetAsigneeUsers,
    assetDetail: isEmpty(props.location.state) ? assetDetail : props.location.state,
    newAllocation,
    unAssignedAsset,
    errorMessage,
    hasError,
    isLoading,
    buttonLoading
  };
};

export default connect(mapStateToProps, {
  getAssetDetail,
  loadAssetAssigneeUsers,
  allocateAsset,
  unassignAsset
})(AssetDetailComponent);
