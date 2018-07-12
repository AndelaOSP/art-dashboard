import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import AddAssetMakeComponent from '../../components/AssetMake/AddAssetMakeComponent';
import { addAssetMakes } from '../../_actions/assetMakes.actions';
import { loadDropdownAssetTypes } from '../../_actions/assetTypes.actions';
import { ToastMessage } from '../../_utils/ToastMessage';
import resetToastMessageContent from '../../_actions/toastMessage.actions';

class AssetMakeContainer extends React.Component {
  state = {
    assetMake: '',
    assetType: '',
    saveButtonState: false
  };

  componentDidMount() {
    if (_.isEmpty(this.props.assetTypes)) {
      this.props.loadDropdownAssetTypes();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { toastMessageContent } = nextProps;
    if (toastMessageContent.type) {
      if (toastMessageContent.type === 'success') {
        ToastMessage.success({
          message: toastMessageContent.message
        });
      } else if (toastMessageContent.type === 'error') {
        ToastMessage.error({
          message: toastMessageContent.message
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

  onChangeButtonState = () => {
    this.setState({ saveButtonState: !this.state.saveButtonState });
  };

  handleSubmit = (event) => {
    const { assetMake, assetType } = this.state;
    const newMake = {
      make_label: assetMake,
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
        onChangeButtonState={this.onChangeButtonState}
        buttonState={this.state.saveButtonState}
      />
    );
  }
}

AssetMakeContainer.defaultProps = {
  assetTypes: []
};

AssetMakeContainer.propTypes = {
  addAssetMakes: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  loadDropdownAssetTypes: PropTypes.func.isRequired,
  resetToastMessageContent: PropTypes.func.isRequired,
  toastMessageContent: PropTypes.object,
  assetTypes: PropTypes.array
};

const mapStateToProps = ({ assetTypesList, toastMessage }) => ({
  assetTypes: assetTypesList.assetTypes,
  toastMessageContent: toastMessage
});

export default connect(mapStateToProps, {
  addAssetMakes,
  loadDropdownAssetTypes,
  resetToastMessageContent
})(AssetMakeContainer);
