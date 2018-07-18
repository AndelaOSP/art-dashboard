import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Container, Header } from 'semantic-ui-react';
import { getAssetDetail } from '../_actions/asset.actions';
import { loadDropDownUsers } from '../_actions/users.actions';
import AssetDetailContent from './AssetDetailContent';
import NavbarComponent from './NavBarComponent';

export class AssetDetailComponent extends Component {
  state = {
    assignedUser: {}
  }

  componentDidMount() {
    this.getAssetId(this.props.location.pathname);
    if (_.isEmpty(this.props.users)) {
      this.props.loadDropDownUsers();
    }
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

  onSelectUserEmail() {
    this.setState({});
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
          />
        </Container >
      </NavbarComponent>
    );
  }
}

AssetDetailComponent.propTypes = {
  loadDropDownUsers: PropTypes.func,
  assetDetail: PropTypes.object,
  getAssetDetail: PropTypes.func,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  location: PropTypes.object,
  users: PropTypes.array
};

const mapStateToProps = ({ asset, usersList }) => {
  const { assetDetail, errorMessage, hasError, isLoading } = asset;
  const { users } = usersList;
  return {
    users,
    assetDetail,
    errorMessage,
    hasError,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getAssetDetail, loadDropDownUsers
})(AssetDetailComponent);
