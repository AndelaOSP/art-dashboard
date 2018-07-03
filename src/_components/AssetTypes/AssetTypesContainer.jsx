import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import AssetTypesComponent from '../../components/AssetTypes/AssetTypesComponent';
import { ToastMessage } from '../../_utils/ToastMessage';

import { loadSubCategories } from '../../_actions/subcategory.actions';
import { createAssetType } from '../../_actions/assetTypes.actions';
import resetToastMessageContent from '../../_actions/resetToastMessage.actions';

export class AssetTypesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assetType: '',
      subCategory: '',
      saveButtonState: false
    };
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
        assetType: '',
        subCategory: '',
        saveButtonState: false
      };
    }
    return null;
  }

  componentDidMount() {
    if (_.isEmpty(this.props.subcategories)) {
      this.props.loadSubCategories();
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

  handleSubmit = (event) => {
    this.props.createAssetType({
      asset_type: this.state.assetType,
      asset_sub_category: this.state.subCategory
    });
    event.target.reset();
  };

  render() {
    return (
      <AssetTypesComponent
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

AssetTypesContainer.propTypes = {
  loadSubCategories: PropTypes.func.isRequired,
  createAssetType: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  resetToastMessageContent: PropTypes.func.isRequired,
  subcategories: PropTypes.array
};

AssetTypesContainer.defaultProps = {
  subcategories: []
};

const mapStateToProps = ({ subcategoriesList, toastMessage }) => ({
  subcategories: subcategoriesList,
  toastMessageContent: toastMessage
});

export default connect(mapStateToProps, {
  loadSubCategories,
  createAssetType,
  resetToastMessageContent
})(AssetTypesContainer);
