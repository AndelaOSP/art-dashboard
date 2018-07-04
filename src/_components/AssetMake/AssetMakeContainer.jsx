import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import AddAssetMakeComponent from '../../components/AssetMake/AddAssetMakeComponent';
import { addAssetMakes } from '../../_actions/assetMakes.actions';
import { loadAssetTypes } from '../../_actions/assetTypes.actions';
import { ToastMessage } from '../../_utils/ToastMessage';
import resetToastMessageContent from '../../_actions/resetToastMessage.actions';

class AssetMakeContainer extends React.Component {
  state = {
    assetMake: '',
    assetType: ''
  };

  componentDidMount() {
    if (_.isEmpty(this.props.assetTypes)) {
      this.props.loadAssetTypes();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.toastMessageContent.type) {
      if (nextProps.toastMessageContent.type === 'success') {
        ToastMessage.success({
          message: nextProps.toastMessageContent.message
        });
      } else if (nextProps.toastMessageContent.type === 'error') {
        ToastMessage.error({
          message: nextProps.toastMessageContent.message
        });
      }
      nextProps.resetToastMessageContent();
      nextProps.toggleModal();
      return {
        assetMake: '',
        assetType: '',
        saveButtonState: false
      };
    }
    return null;
  }

  onAddAssetMake = (event) => {
    this.setState({ assetMake: event.target.value });
  }

  onSelectAssetType = (event, data) => {
    this.setState({ assetType: data.value });
  }

  handleSubmit = (event) => {
    const { assetMake, assetType } = this.state;
    const newMake = {
      asset_make: assetMake,
      asset_type: assetType
    };
    this.props.addAssetMakes(newMake);
    event.target.reset();
  }

  render() {
    return (
      <AddAssetMakeComponent
        {...this.props}
        onaddAssetMake={this.onAddAssetMake}
        handleSubmit={this.handleSubmit}
        toggleModal={this.props.toggleModal}
        onSelectAssetType={this.onSelectAssetType}
      />
    );
  }
}

AssetMakeContainer.propTypes = {
  addAssetMakes: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  resetToastMessageContent: PropTypes.func.isRequired,
  loadAssetTypes: PropTypes.func.isRequired,
  assetTypes: PropTypes.array
};

const mapStateToProps = ({ assetTypeList, toastMessage }) => ({
  assetTypes: assetTypeList,
  toastMessageContent: toastMessage
});

export default connect(mapStateToProps, {
  addAssetMakes,
  loadAssetTypes,
  resetToastMessageContent
})(AssetMakeContainer);
