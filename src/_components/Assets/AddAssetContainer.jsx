import _ from 'lodash';
import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { Divider, Grid, Header, Icon, Step } from 'semantic-ui-react';

import FilterAssetComponent from '../../components/Assets/FilterAssetComponent';
import SpecsComponent from '../../components/Assets/SpecsComponent';
import NavbarComponent from '../../components/NavBarComponent';
import LoaderComponent from '../../components/LoaderComponent';

import { loadCategoriesDropdown } from '../../_actions/category.actions';
import { loadSubCategoriesDropdown } from '../../_actions/subcategory.actions';
import { loadAssetTypes } from '../../_actions/assetTypes.actions';
import { loadAssetMakesDropdown } from '../../_actions/assetMakes.actions';
import { loadModelNumbers } from '../../_actions/modelNumbers.actions';
import { createAsset } from '../../_actions/asset.actions';
import { ACCEPTABLE_ASSET_TYPES } from '../../_enums';

import {
  filterSubCategories,
  filterAssetTypes,
  filterAssetMakes,
  filterModelNumbers
} from '../../_utils/filterDropdowns';

class AddAssetContainer extends React.Component {
  step1 = 'Device_Information';
  step2 = 'Device_Specifications';

  state = {
    filteredSubCategories: [],
    filteredAssetTypes: [],
    filteredAssetMakes: [],
    filteredModelNumbers: [],
    selectedCategory: '',
    selectedSubcategory: '',
    selectedAssetType: '',
    selectedAssetMake: '',
    step: this.step1,
    specs: {}
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

  handleInputChange = (event, data = {}) => {
    event.stopPropagation();

    // model numbers have value in data.
    const name = event.target.name || data.name;
    const value = event.target.value || data.value;
    this.setState({ [name]: value });
  };

  onNextClicked = () => {
    this.setState({ step: this.step2 });
  };

  goBack = () => {
    this.setState({ step: this.step1 });
  };

  pickRadioValuesFromSpecsComponent = (data) => {
    this.setState(previousState => ({
      specs: {
        ...previousState.specs,
        ...data
      }
    }));
  };

  onCreateAsset = () => {
    let newAssetDetails = {
      asset_code: this.state.assetTag,
      serial_number: this.state.serialNumber,
      model_number: this.state.modelNumber
    };

    if (!_.isEmpty(this.state.specs)) {
      newAssetDetails = {
        ...newAssetDetails,
        year: this.state.specs.year,
        processor_type: this.state.specs.processor_type,
        processor_speed: this.state.specs.processor_speed,
        storage: this.state.specs.storage,
        memory: this.state.specs.memory
      };
    }

    this.props.createAsset(newAssetDetails)
      .then(() => this.props.history.push('/assets'));
  };

  render() {
    const { step } = this.state;
    const { loading } = this.props;
    const isDisabled = this.stepValidator();
    let stepContent;
    let step1Active;
    let step2Active;

    const isAssetSpecsAvailable = ACCEPTABLE_ASSET_TYPES.indexOf(this.state.selectedAssetType) > -1;

    if (loading) {
      return (
        <NavbarComponent>
          <LoaderComponent />
        </NavbarComponent>
      );
    }

    if (step === this.step1) {
      step1Active = step === this.step1;

      stepContent = (
        <div className="add-asset__device-info">
          <FilterAssetComponent
            categories={this.props.categories}
            handleDropdownChanges={this.handleDropdownChanges}
            filteredSubCategories={this.state.filteredSubCategories}
            filteredAssetTypes={this.state.filteredAssetTypes}
            filteredAssetMakes={this.state.filteredAssetMakes}
            filteredModelNumbers={this.state.filteredModelNumbers}
            handleInputChange={this.handleInputChange}
            selectedCategory={this.state.selectedCategory}
            selectedSubcategory={this.state.selectedSubcategory}
            selectedAssetType={this.state.selectedAssetType}
            selectedAssetMake={this.state.selectedAssetMake}
            modelNumber={this.state.modelNumber || ''}
            serialNumber={this.state.serialNumber || ''}
            assetTag={this.state.assetTag || ''}
            isDisabled={isDisabled}
            onNextClicked={this.onNextClicked}
            isAssetSpecsAvailable={isAssetSpecsAvailable}
            buttonLoading={this.props.buttonLoading}
            onCreateAsset={this.onCreateAsset}
          />
        </div>
      );
    } else if (step === this.step2) {
      step2Active = step === this.step2;

      stepContent = (
        <div className="add-asset__device-specs">
          <SpecsComponent
            specs={this.state.specs}
            goBack={this.goBack}
            buttonLoading={this.props.buttonLoading}
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

AddAssetContainer.propTypes = {
  categories: PropTypes.array,
  subcategories: PropTypes.array,
  assetTypes: PropTypes.array,
  assetMakes: PropTypes.array,
  modelNumbers: PropTypes.array,
  loadCategoriesDropdown: PropTypes.func.isRequired,
  loadSubCategoriesDropdown: PropTypes.func.isRequired,
  loadAssetTypes: PropTypes.func.isRequired,
  loadAssetMakesDropdown: PropTypes.func.isRequired,
  loadModelNumbers: PropTypes.func.isRequired,
  createAsset: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonLoading: PropTypes.bool,
  history: PropTypes.object
};

AddAssetContainer.defaultProps = {
  categories: [],
  subcategories: [],
  assetTypes: [],
  assetMakes: [],
  modelNumbers: [],
  history: {}
};

const mapStateToProps = ({
  categoriesList,
  subcategoriesList,
  assetTypesList,
  assetMakesList,
  modelNumbersList,
  assets
}) => ({
  categories: categoriesList.categoriesDropdown,
  subcategories: subcategoriesList.assetSubCategoriesDropdown,
  assetTypes: assetTypesList.assetTypes,
  assetMakes: assetMakesList.assetMakes,
  modelNumbers: modelNumbersList,
  buttonLoading: assets.isLoading,
  loading: categoriesList.isLoading || subcategoriesList.isLoading ||
                  assetTypesList.isLoading || assetMakesList.isLoading
});

export default connect(mapStateToProps, {
  loadCategoriesDropdown,
  loadSubCategoriesDropdown,
  loadAssetTypes,
  loadAssetMakesDropdown,
  loadModelNumbers,
  createAsset
})(AddAssetContainer);
