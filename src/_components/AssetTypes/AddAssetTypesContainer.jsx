import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import AddAssetTypesComponent from '../../components/AssetTypes/AddAssetTypesComponent';
import { ToastMessage } from '../../_utils/ToastMessage';

import { loadSubCategoriesDropdown } from '../../_actions/subcategory.actions';
import { createAssetType } from '../../_actions/assetTypes.actions';
import resetToastMessageContent from '../../_actions/toastMessage.actions';

export class AddAssetTypesContainer extends React.Component {
  state = {
    assetType: '',
    subCategory: '',
    saveButtonState: false
  };

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
        assetType: '',
        subCategory: '',
        saveButtonState: false
      };
    }
    return null;
  }

  componentDidMount() {
    if (_.isEmpty(this.props.subcategories)) {
      this.props.loadSubCategoriesDropdown();
    }
  }

  onAddAssetType = (event) => {
    this.setState({ assetType: event.target.value });
  };

  onSelectSubCategory = (event, data) => {
    this.setState({ subCategory: data.value });
  };

  onChangeButtonState = () => {
    this.setState({ saveButtonState: !this.state.saveButtonState });
  };

  handleSubmit = () => {
    this.props.createAssetType({
      asset_type: this.state.assetType,
      asset_sub_category: this.state.subCategory
    });
  };

  render() {
    return (
      <AddAssetTypesComponent
        {...this.props}
        onAddAssetType={this.onAddAssetType}
        onSelectSubCategory={this.onSelectSubCategory}
        handleSubmit={this.handleSubmit}
        onChangeButtonState={this.onChangeButtonState}
        buttonState={this.state.saveButtonState}
        toggleModal={this.props.toggleModal}
      />
    );
  }
}

AddAssetTypesContainer.propTypes = {
  loadSubCategoriesDropdown: PropTypes.func.isRequired,
  createAssetType: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  resetToastMessageContent: PropTypes.func.isRequired,
  subcategories: PropTypes.array,
  toastMessageContent: PropTypes.object
};

AddAssetTypesContainer.defaultProps = {
  subcategories: [],
  toastMessageContent: {
    type: '',
    message: ''
  }
};

const mapStateToProps = ({ subcategoriesList, toastMessage }) => ({
  subcategories: subcategoriesList.assetSubCategoriesDropdown,
  toastMessageContent: toastMessage
});

export default connect(mapStateToProps, {
  loadSubCategoriesDropdown,
  createAssetType,
  resetToastMessageContent
})(AddAssetTypesContainer);
