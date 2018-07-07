import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import { getAssetDetail } from '../_actions/asset.actions';
import AssetDetailContent from './AssetDetailContent';
import SideMenuComponent from '../_components/SideMenuComponent';

class AssetDetailComponent extends Component {
  state = {
    assignedUser: {}
  }
  componentDidMount() {
    this.getAssetId(this.props.location.pathname);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.assetDetail.assigned_to !== state.assignedUser) {
      return {
        assignedUser: props.assetDetail.assigned_to
      };
    }
    return null;
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.hasError &&
      (this.props.errorMessage === nextProps.errorMessage)) {
      return false;
    }
    return true;
  }

  getAssetId(pathName) {
    const stringArray = pathName.split('/');
    const serialNumber = stringArray[2];
    this.props.getAssetDetail(serialNumber);
  }

  render() {
    return (
      <SideMenuComponent>
        <Container>
          <AssetDetailContent
            assetDetail={this.props.assetDetail}
            assignedUser={this.state.assignedUser}
            errorMessage={this.props.errorMessage}
            hasError={this.props.hasError}
            isLoading={this.props.isLoading}
          />
        </Container >
      </SideMenuComponent>
    );
  }
}

AssetDetailComponent.propTypes = {
  assetDetail: PropTypes.object,
  getAssetDetail: PropTypes.func,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  location: PropTypes.object
};

const mapStateToProps = ({ asset }) => {
  const { assetDetail, errorMessage, hasError, isLoading } = asset;
  return {
    assetDetail,
    errorMessage,
    hasError,
    isLoading
  };
};

export default connect(mapStateToProps, { getAssetDetail })(AssetDetailComponent);
