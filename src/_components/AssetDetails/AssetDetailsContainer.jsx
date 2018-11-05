import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Container, Divider, Header } from 'semantic-ui-react';
import { getAssetDetail } from '../../_actions/asset.actions';
import { loadAssetAssigneeUsers } from '../../_actions/users.actions';
import AssetDetailsComponent from '../../components/AssetDetails/AssetDetailsComponent';
import NavBarComponent from '../NavBarContainer';
import LoaderComponent from '../../components/LoaderComponent';

export class AssetDetailsContainer extends Component {
  state = {
    assignedUser: {},
    hasError: this.props.hasError,
    errorMessage: this.props.errorMessage
  };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    this.props.getAssetDetail(id);
    this.props.loadAssetAssigneeUsers();
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      assignedUser: nextProps.assetDetail.assigned_to,
      hasError: nextProps.hasError,
      errorMessage: nextProps.errorMessage
    };
  }


  render() {
    let renderedComponent;
    if (isEmpty(this.props.assetDetail)) {
      renderedComponent = <LoaderComponent loadingText="Loading" />;
    } else {
      renderedComponent = (
        <AssetDetailsComponent
          buttonLoading={this.props.buttonLoading}
          assignedUser={this.state.assignedUser}
          assetDetail={this.props.assetDetail}
          errorMessage={this.state.errorMessage}
          hasError={this.state.hasError}
          assetLoading={this.props.assetLoading}
          userLoading={this.props.userLoading}
          show={this.show}
          handleCancel={this.handleCancel}
          buttonState={this.props.buttonLoading}
          users={this.props.assetAsigneeUsers}
          serialNumber={this.props.match.params.id}
        />);
    }
    return (
      <NavBarComponent>
        <Container>
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Detail" />
            <Divider id="assets-divider" />
          </div>
          {renderedComponent}
        </Container>
      </NavBarComponent>
    );
  }
}

AssetDetailsContainer.propTypes = {
  loadAssetAssigneeUsers: PropTypes.func,
  assetDetail: PropTypes.object,
  getAssetDetail: PropTypes.func,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  assetLoading: PropTypes.bool,
  userLoading: PropTypes.bool,
  buttonLoading: PropTypes.bool,
  assetAsigneeUsers: PropTypes.array,
  match: PropTypes.object
};

export const mapStateToProps = ({ asset, usersList }) => {
  const {
    assetDetail,
    errorMessage,
    hasError,
    newAllocation,
    unAssignedAsset,
    buttonLoading
  } = asset;
  const { assetAsigneeUsers } = usersList;
  const assetLoading = asset.isLoading;
  const userLoading = usersList.isLoading;

  return {
    assetAsigneeUsers,
    assetDetail,
    newAllocation,
    unAssignedAsset,
    errorMessage,
    hasError,
    assetLoading,
    userLoading,
    buttonLoading
  };
};

export default connect(mapStateToProps, {
  getAssetDetail, loadAssetAssigneeUsers
})(AssetDetailsContainer);
