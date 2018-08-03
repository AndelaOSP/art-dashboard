import _ from 'lodash';
import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { ToastMessage } from '../../_utils/ToastMessage';

import AddAssetComponent from '../../components/Assets/AddAssetComponent';
import FilterAssetComponent from '../../components/Assets/FilterAssetComponent';
import SpecsComponent from '../../components/Assets/SpecsComponent';

import { loadCategoriesDropdown } from '../../_actions/category.actions';
import { loadSubCategoriesDropdown } from '../../_actions/subcategory.actions';
import { loadAssetTypes } from '../../_actions/assetTypes.actions';
import { loadAssetMakes, loadAssetMakesDropdown } from '../../_actions/assetMakes.actions';
import { loadModelNumbers } from '../../_actions/modelNumbers.actions';
import { createAsset } from '../../_actions/asset.actions';
import resetToastMessageContent from '../../_actions/toastMessage.actions';

import {
  filterSubCategories,
  filterAssetTypes,
  filterAssetMakes,
  filterModelNumbers
} from '../../_utils/filterDropdowns';

class AddAssetContainer extends React.Component {
  state = {
    filteredSubCategories: [],
    filteredAssetTypes: [],
    filteredAssetMakes: [],
    filteredModelNumbers: [],
    modelNumber: 0,
    serialNumber: '',
    assetTag: '',
    saveButtonState: false,
    page: 0,
    specs: {
      year: '',
      processorType: '',
      processorSpeed: '',
      screenSize: '',
      storage: '',
      memory: ''
    }
  };

  componentDidMount() {
    if (_.isEmpty(this.props.categories)) {
      this.props.loadCategoriesDropdown();
    }
    if (_.isEmpty(this.props.subcategories)) {
      this.props.loadSubCategoriesDropdown();
    }
    if (_.isEmpty(this.props.assetTypes)) {
      this.props.loadAssetTypes(1);
    }
    if (_.isEmpty(this.props.assetMakes)) {
      this.props.loadAssetMakesDropdown();
    }
    if (_.isEmpty(this.props.modelNumbers)) {
      this.props.loadModelNumbers();
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
        filteredSubCategories: [],
        filteredAssetTypes: [],
        filteredAssetMakes: [],
        filteredModelNumbers: [],
        modelNumber: 0,
        serialNumber: '',
        assetTag: ''
      };
    }
    return null;
  }

  handleDropdownChanges = (event, data) => {
    event.stopPropagation();
    const { name, value } = data;
    const { subcategories, assetTypes, assetMakes, modelNumbers } = this.props;

    if (name === 'asset-category') {
      this.setState({
        filteredSubCategories: filterSubCategories(subcategories, value)
      });
    } else if (name === 'asset-subcategory') {
      this.setState({
        filteredAssetTypes: filterAssetTypes(assetTypes, value)
      });
    } else if (name === 'asset-types') {
      this.setState({
        filteredAssetMakes: filterAssetMakes(assetMakes, value)
      });
    } else if (name === 'asset-makes') {
      this.setState({
        filteredModelNumbers: filterModelNumbers(modelNumbers, value)
      });
    }
  };

  onSelectModelNumber = (event, data) => {
    event.stopPropagation();
    this.setState({ modelNumber: data.value });
  };

  onAddSerialNumber = (event) => {
    this.setState({ serialNumber: event.target.value });
  };

  onAddAssetTag = (event) => {
    this.setState({ assetTag: event.target.value });
  };

  onChangeButtonState = () => {
    this.setState({ saveButtonState: !this.state.saveButtonState });
  };

  onNextClicked = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  }

  goBack = () => {
    this.setState(({ page }) => ({ page: page - 1 }));
  }

  pickRadioValuesFromSpecsComponent = (data) => {
    this.setState({ specs: data });
  }

  onCreateAsset = () => {
    this.props.createAsset({
      asset_code: this.state.assetTag,
      serial_number: this.state.serialNumber,
      model_number: this.state.modelNumber,
      year: this.state.specs.year,
      processor_type: this.state.specs.processorType,
      processor_speed: this.state.specs.processorSpeed,
      screen_size: this.state.specs.screenSize,
      storage: this.state.specs.storage,
      memory: this.state.specs.memory
    });
  };

  render() {
    if (this.state.page === 1) {
      return (
        <AddAssetComponent
          {...this.props}
          onSelectModelNumber={this.onSelectModelNumber}
          onAddSerialNumber={this.onAddSerialNumber}
          onAddAssetTag={this.onAddAssetTag}
          onCreateAsset={this.onCreateAsset}
          goBack={this.goBack}
          filteredModelNumbers={this.state.filteredModelNumbers}
          modelNumber={this.state.modelNumber}
          serialNumber={this.state.serialNumber}
          assetTag={this.state.assetTag}
          buttonState={this.state.saveButtonState}
          onChangeButtonState={this.onChangeButtonState}
        >
          <SpecsComponent
            {...this.props}
            specs={this.state.specs}
            pickRadioValuesFromSpecsComponent={this.pickRadioValuesFromSpecsComponent}
          />
        </AddAssetComponent>
      );
    }
    return (
      <FilterAssetComponent
        {...this.props}
        handleDropdownChanges={this.handleDropdownChanges}
        filteredSubCategories={this.state.filteredSubCategories}
        filteredAssetTypes={this.state.filteredAssetTypes}
        filteredAssetMakes={this.state.filteredAssetMakes}
        page={this.state.page}
        onNextClicked={this.onNextClicked}
      />
    );
  }
}

AddAssetContainer.propTypes = {
  categories: PropTypes.array,
  subcategories: PropTypes.array,
  assetTypes: PropTypes.array,
  assetMakes: PropTypes.array,
  modelNumbers: PropTypes.array,
  assets: PropTypes.array,
  toastMessageContent: PropTypes.object,
  loadCategoriesDropdown: PropTypes.func.isRequired,
  loadSubCategoriesDropdown: PropTypes.func.isRequired,
  loadAssetTypes: PropTypes.func.isRequired,
  loadAssetMakes: PropTypes.func.isRequired,
  loadAssetMakesDropdown: PropTypes.func.isRequired,
  loadModelNumbers: PropTypes.func.isRequired,
  createAsset: PropTypes.func.isRequired,
  resetToastMessageContent: PropTypes.func.isRequired
};

AddAssetContainer.defaultProps = {
  categories: [],
  subcategories: [],
  assetTypes: [],
  assetMakes: [],
  modelNumbers: [],
  assets: [],
  toastMessageContent: {
    type: '',
    message: ''
  }
};

const mapStateToProps = ({
  categoriesList,
  subcategoriesList,
  assetTypesList,
  assetMakesList,
  modelNumbersList,
  assets,
  toastMessage
}) => ({
  categories: categoriesList.categoriesDropdown,
  subcategories: subcategoriesList.assetSubCategoriesDropdown,
  assetTypes: assetTypesList.assetTypes,
  assetMakes: assetMakesList.assetMakes,
  modelNumbers: modelNumbersList,
  assets: assets.assetsList,
  toastMessageContent: toastMessage
});

export default connect(mapStateToProps, {
  loadCategoriesDropdown,
  loadSubCategoriesDropdown,
  loadAssetTypes,
  loadAssetMakes,
  loadAssetMakesDropdown,
  loadModelNumbers,
  createAsset,
  resetToastMessageContent
})(AddAssetContainer);
