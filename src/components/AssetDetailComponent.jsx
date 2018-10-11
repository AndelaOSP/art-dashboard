import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Container, Divider, Header } from 'semantic-ui-react';
import { getAssetDetail } from '../_actions/asset.actions';
import { loadAssetAssigneeUsers } from '../_actions/users.actions';
import AssetDetailContent from './AssetDetailContent';
import NavbarComponent from './NavBarComponent';
import LoaderComponent from './LoaderComponent';

export class AssetDetailComponent extends Component {
  state = {
    assignedUser: {},
    serialNumber: '',
    hasError: this.props.hasError,
    errorMessage: this.props.errorMessage
  };

  componentDidMount() {
    const { assetDetail, assetAsigneeUsers } = this.props;
    if (isEmpty(assetDetail)) {
      this.getAssetId(this.props.location.pathname);
    }
    if (isEmpty(assetAsigneeUsers)) {
      this.props.loadAssetAssigneeUsers();
    }
  }
  static getDerivedStateFromProps(nextProps) {
    return {
      assignedUser: nextProps.assetDetail.assigned_to,
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

  render() {
    let renderedComponent;
    if (isEmpty(this.props.assetDetail)) {
      renderedComponent = <LoaderComponent loadingText="Loading" />;
    } else {
      renderedComponent = (
        <AssetDetailContent
          {...this.props}
          assignedUser={this.state.assignedUser}
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
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Detail" />
            <Divider id="assets-divider" />
          </div>
          {renderedComponent}
        </Container>
      </NavbarComponent>
    );
  }
}

AssetDetailComponent.propTypes = {
  loadAssetAssigneeUsers: PropTypes.func,
  assetDetail: PropTypes.object,
  getAssetDetail: PropTypes.func,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  buttonLoading: PropTypes.bool,
  location: PropTypes.object,
  assetAsigneeUsers: PropTypes.array
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
  const isLoading = asset.isLoading || usersList.isLoading;

  return {
    assetAsigneeUsers,
    assetDetail: isEmpty(assetDetail) ? props.location.state : assetDetail,
    newAllocation,
    unAssignedAsset,
    errorMessage,
    hasError,
    isLoading,
    buttonLoading
  };
};

export default connect(mapStateToProps, {
  getAssetDetail, loadAssetAssigneeUsers
})(AssetDetailComponent);
