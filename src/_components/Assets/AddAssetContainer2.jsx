import _ from 'lodash';
import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { Divider, Grid, Header, Icon, Step } from 'semantic-ui-react';
import { ToastMessage } from '../../_utils/ToastMessage';

import FilterAssetComponent2 from '../../components/Assets/FilterAssetComponent2';
import SpecsComponent2 from '../../components/Assets/SpecsComponent2';
import NavbarComponent from '../../components/NavBarComponent';
import LoaderComponent from '../../components/LoaderComponent';

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

class AddAssetContainer2 extends React.Component {
  state = {
    filteredSubCategories: [],
    filteredAssetTypes: [],
    filteredAssetMakes: [],
    filteredModelNumbers: [],
    selectedCategory: '',
    selectedSubcategory: '',
    selectedAssetType: '',
    selectedAssetMake: '',
    modelNumber: '',
    serialNumber: '',
    assetTag: '',
    saveButtonState: false,
    step: 1,
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

  stepValidator = () => (
    _.isEmpty(this.state.modelNumber) ||
      _.isEmpty(this.state.serialNumber) ||
      _.isEmpty(this.state.assetTag)
  );

  handleDropdownChanges = (event, data) => {
    event.stopPropagation();
    const { name, value } = data;
    const { subcategories, assetTypes, assetMakes, modelNumbers } = this.props;

    if (name === 'asset-category') {
      this.setState({
        selectedCategory: value,
        selectedAssetMake: '',
        filteredSubCategories: filterSubCategories(subcategories, value),
        filteredAssetTypes: filterAssetTypes(assetTypes, value),
        filteredAssetMakes: filterAssetMakes(assetMakes, value),
        filteredModelNumbers: filterModelNumbers(modelNumbers, value)
      });
    } else if (name === 'asset-subcategory') {
      this.setState({
        selectedSubcategory: value,
        selectedAssetMake: '',
        filteredAssetTypes: filterAssetTypes(assetTypes, value),
        filteredAssetMakes: filterAssetMakes(assetMakes, value),
        filteredModelNumbers: filterModelNumbers(modelNumbers, value)
      });
    } else if (name === 'asset-types') {
      this.setState({
        selectedAssetType: value,
        selectedAssetMake: '',
        filteredAssetMakes: filterAssetMakes(assetMakes, value),
        filteredModelNumbers: filterModelNumbers(modelNumbers, value)
      });
    } else if (name === 'asset-makes') {
      this.setState({
        selectedAssetMake: value,
        modelNumber: '',
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
    this.setState(({ step }) => ({ step: step + 1 }));
  };

  goBack = () => {
    this.setState(({ step }) => ({ step: step - 1 }));
  };

  pickRadioValuesFromSpecsComponent = (data) => {
    this.setState({ specs: data });
  };

  onCreateAsset = () => {
    const newAssetDetails = {
      asset_code: this.state.assetTag,
      serial_number: this.state.serialNumber,
      model_number: this.state.modelNumber
    };

    if (_.isEmpty(this.state.specs)) {
      newAssetDetails.year = this.state.specs.year;
      newAssetDetails.processor_type = this.state.specs.processorType;
      newAssetDetails.processor_speed = this.state.specs.processorSpeed;
      newAssetDetails.screen_size = this.state.specs.screenSize;
      newAssetDetails.storage = this.state.specs.storage;
      newAssetDetails.memory = this.state.specs.memory;
    }

    this.props.createAsset(newAssetDetails);
  };

  render() {
    const { step } = this.state;
    const isDisabled = this.stepValidator();
    let stepContent;
    let step1Active;
    let step2Active;
    const acceptableAssetTypes = [
      'Macbook', 'Monitor', 'Monitors', 'Phone', 'Tablet'
    ];

    const isAssetSpecsAvailable = () =>
      acceptableAssetTypes.indexOf(this.state.selectedAssetType) > -1;

    if (Object.values(this.props.isLoadingState).find(loading => loading)) {
      return (
        <NavbarComponent>
          <LoaderComponent />
        </NavbarComponent>
      );
    }

    if (step === 1) {
      step1Active = step === 1;

      stepContent = (
        <div className="add-asset__device-info">
          <FilterAssetComponent2
            {...this.props}
            handleDropdownChanges={this.handleDropdownChanges}
            filteredSubCategories={this.state.filteredSubCategories}
            filteredAssetTypes={this.state.filteredAssetTypes}
            filteredAssetMakes={this.state.filteredAssetMakes}
            filteredModelNumbers={this.state.filteredModelNumbers}
            onSelectModelNumber={this.onSelectModelNumber}
            onAddSerialNumber={this.onAddSerialNumber}
            onAddAssetTag={this.onAddAssetTag}
            selectedCategory={this.state.selectedCategory}
            selectedSubcategory={this.state.selectedSubcategory}
            selectedAssetType={this.state.selectedAssetType}
            selectedAssetMake={this.state.selectedAssetMake}
            modelNumber={this.state.modelNumber}
            serialNumber={this.state.serialNumber}
            assetTag={this.state.assetTag}
            isDisabled={isDisabled}
            onNextClicked={this.onNextClicked}
            isAssetSpecsAvailable={isAssetSpecsAvailable()}
            onChangeButtonState={this.onChangeButtonState}
            onCreateAsset={this.onCreateAsset}
          />
        </div>
      );
    } else if (step === 2) {
      step2Active = step === 2;

      stepContent = (
        <div className="add-asset__device-specs">
          <SpecsComponent2
            specs={this.state.specs}
            goBack={this.goBack}
            buttonState={this.state.saveButtonState}
            onChangeButtonState={this.onChangeButtonState}
            onCreateAsset={this.onCreateAsset}
            pickRadioValuesFromSpecsComponent={this.pickRadioValuesFromSpecsComponent}
          />
        </div>
      );
    }

    return (
      <NavbarComponent>
        <div className="add-asset">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Add Asset" />
            <Divider id="assets-divider" />
          </div>

          <Grid centered columns={2}>
            <Grid.Column>
              <Step.Group size="small" widths={2}>
                <Step active={step1Active} completed={!step1Active}>
                  <Icon name="laptop" />
                  <Step.Content>
                    <Step.Title>Device Info</Step.Title>
                    <Step.Description>Identify your device</Step.Description>
                  </Step.Content>
                </Step>

                <Step active={step2Active} disabled={step1Active}>
                  <Icon name="list ul" />
                  <Step.Content>
                    <Step.Title>Device Specs</Step.Title>
                    <Step.Description>Enter device specifications</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>

              {stepContent}
            </Grid.Column>
          </Grid>
        </div>
      </NavbarComponent>
    );
  }
}

AddAssetContainer2.propTypes = {
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
  resetToastMessageContent: PropTypes.func.isRequired,
  isLoadingState: PropTypes.object.isRequired
};

AddAssetContainer2.defaultProps = {
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
  toastMessageContent: toastMessage,
  isLoadingState: {
    isLoadingCategories: categoriesList.isLoading,
    isLoadingSubcategories: subcategoriesList.isLoading,
    isLoadingAssetTypes: assetTypesList.isLoading,
    isLoadingAssetMakes: assetMakesList.isLoading
  }
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
})(AddAssetContainer2);
