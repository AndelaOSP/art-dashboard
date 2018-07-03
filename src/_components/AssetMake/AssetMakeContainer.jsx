import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddAssetMakeComponent from '../../components/AssetMake/AddAssetMakeComponent';
import { addAssetMakes } from '../../_actions/assetMakes.actions';
// import { loadAssetTypes } from '../../_actions/assetTypes.actions';
import { ToastMessage } from '../../_utils/ToastMessage';
import resetToastMessageContent from '../../_actions/resetToastMessage.actions';

class AssetMakeContainer extends React.Component {
  state = {
    assetMake: '',
    assetType: ''
  };

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

  handleSubmit = (event) => {
    const { assetMake, assetType } = this.state;
    const newMake = {
      asset_make: assetMake,
      asset_type: assetType
    };
    this.props.addAssetMakes(newMake);
    event.target.reset();
  }

  onAddAssetMake = (event) => {
    this.setState({ assetMake: event.target.value });
  }

  onSelectAssetType = (event) => {
    // to be changed to a drop down event listener after fix for asset types is done
    this.setState({ assetType: event.target.value });
  }

  render() {
    return (
      <AddAssetMakeComponent
        {...this.props}
        onaddAssetMake={this.onAddAssetMake}
        handleSubmit={this.handleSubmit}
        toggleModal={this.props.toggleModal}
      />
    );
  }
}
AssetMakeContainer.propTypes = {
  addAssetMakes: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  resetToastMessageContent: PropTypes.func.isRequired
};
const mapStateToProps = ({ assetTypes, toastMessage }) => ({
  assetTypes,
  toastMessageContent: toastMessage
});
export default connect(mapStateToProps, {
  addAssetMakes,
  resetToastMessageContent
})(AssetMakeContainer);
