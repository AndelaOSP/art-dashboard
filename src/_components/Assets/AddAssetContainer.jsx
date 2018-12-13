import _ from 'lodash';
import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { Divider, Grid, Header, Icon, Step } from 'semantic-ui-react';

import FilterAssetComponent from '../../components/Assets/FilterAssetComponent';
import SpecsComponent from '../../components/Assets/SpecsComponent';
import NavBarComponent from '../NavBarContainer';
import LoaderComponent from '../../components/LoaderComponent';
import StatusMessageComponent from '../../components/common/StatusComponent';

import { loadCategoriesDropdown } from '../../_actions/category.actions';
import { loadSubCategoriesDropdown } from '../../_actions/subcategory.actions';
import { loadAssetTypes } from '../../_actions/assetTypes.actions';
import { loadAssetMakesDropdown } from '../../_actions/assetMakes.actions';
import { loadModelNumbers } from '../../_actions/modelNumbers.actions';
import { createAsset, resetMessage } from '../../_actions/asset.actions';
// import { ACCEPTABLE_ASSET_TYPES } from '../../_enums';

import {
  filterSubCategories,
  filterAssetTypes,
  filterAssetMakes,
  filterModelNumbers
} from '../../_utils/filterDropdowns';

/**
 *  TODO: @stacey is going to refactor  this component as it is a mess to work with right now.
 * Therefore, let `initialFormState`  be used for now
 */

const initialFormState = {
  selectedCategory: '',
  selectedSubcategory: '',
  selectedAssetType: '',
  selectedAssetMake: '',
  modelNumber: '',
  serialNumber: '',
  assetTag: ''
};

class AddAssetContainer extends React.Component {
  step1 = 'Device_Information';
  step2 = 'Device_Specifications';

  state = {
    filteredSubCategories: [],
    filteredAssetTypes: [],
    filteredAssetMakes: [],
    filteredModelNumbers: [],
    formState: initialFormState,
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
    _.isEmpty(this.state.formState.modelNumber) ||
    _.isEmpty(this.state.formState.serialNumber) ||
    _.isEmpty(this.state.formState.assetTag)
  );

  handleDropdownChanges = (event, data) => {
    event.stopPropagation();
    const { name, value } = data;
    const { subcategories, assetTypes, assetMakes, modelNumbers } = this.props;

    if (name === 'asset-category') {
      this.setState({
        formState: {
          ...this.state.formState,
          selectedCategory: value,
          selectedSubcategory: '',
          selectedAssetType: '',
          selectedAssetMake: '',
          modelNumber: ''
        },
        filteredSubCategories: filterSubCategories(subcategories, value),
        filteredAssetTypes: filterAssetTypes(assetTypes, value),
        filteredAssetMakes: filterAssetMakes(assetMakes, value),
        filteredModelNumbers: filterModelNumbers(modelNumbers, value)
      });
    } else if (name === 'asset-subcategory') {
      this.setState({
        formState: {
          ...this.state.formState,
          selectedSubcategory: value,
          selectedAssetType: '',
          selectedAssetMake: '',
          modelNumber: ''
        },
        filteredAssetTypes: filterAssetTypes(assetTypes, value),
        filteredAssetMakes: filterAssetMakes(assetMakes, value),
        filteredModelNumbers: filterModelNumbers(modelNumbers, value)
      });
    } else if (name === 'asset-types') {
      this.setState({
        formState: {
          ...this.state.formState,
          selectedAssetType: value,
          selectedAssetMake: '',
          modelNumber: ''
        },
        filteredAssetMakes: filterAssetMakes(assetMakes, value),
        filteredModelNumbers: filterModelNumbers(modelNumbers, value)
      });
    } else if (name === 'asset-makes') {
      this.setState({
        formState: {
          ...this.state.formState,
          selectedAssetMake: value,
          modelNumber: ''
        },
        filteredModelNumbers: filterModelNumbers(modelNumbers, value)
      });
    }
  };

  handleInputChange = (event, data = {}) => {
    event.stopPropagation();

    // model numbers have value in data.
    const name = event.target.name || data.name;
    const value = event.target.value || data.value;
    this.setState({ formState: { ...this.state.formState, [name]: value } });
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
      asset_code: this.state.formState.assetTag,
      serial_number: this.state.formState.serialNumber,
      model_number: this.state.formState.modelNumber
    };

    if (!_.isEmpty(this.state.specs)) {
      newAssetDetails = {
        ...newAssetDetails,
        year: this.state.specs.year,
        processor_type: this.state.specs.processor_type,
        processor_speed: this.state.specs.processor_speed,
        screen_size: this.state.specs.screen_size,
        storage: this.state.specs.storage,
        memory: this.state.specs.memory
      };
    }

    this.props.createAsset(newAssetDetails)
      .then(() => {
        this.goBack();
      });
    this.setState({ formState: initialFormState });
  };

  render() {
    const { step } = this.state;
    const { loading, success, error, assetTypes } = this.props;
    const isDisabled = this.stepValidator();
    let stepContent;
    let step1Active;
    let step2Active;

    const showStatus = success || error;

    const selectedAssetType = assetTypes.find(asset =>
      asset.asset_type === this.state.formState.selectedAssetType);

    // null check if it is defined first
    const isAssetSpecsAvailable = selectedAssetType && selectedAssetType.has_specs;

    if (loading) {
      return (
        <NavBarComponent>
          <LoaderComponent />
        </NavBarComponent>
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
            selectedCategory={this.state.formState.selectedCategory}
            selectedSubcategory={this.state.formState.selectedSubcategory}
            selectedAssetType={this.state.formState.selectedAssetType}
            selectedAssetMake={this.state.formState.selectedAssetMake}
            modelNumber={this.state.formState.modelNumber || ''}
            serialNumber={this.state.formState.serialNumber || ''}
            assetTag={this.state.formState.assetTag || ''}
            isDisabled={isDisabled}
            onNextClicked={this.onNextClicked}
            isAssetSpecsAvailable={isAssetSpecsAvailable}
            buttonLoading={this.props.buttonLoading}
            onCreateAsset={this.onCreateAsset}
            reset={this.props.resetMessage}
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
            reset={this.props.resetMessage}
          />
        </div>
      );
    }

    return (
      <NavBarComponent>
        <div className="add-asset">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Add Asset" />
            <Divider id="assets-divider" />
          </div>


          <Grid centered columns={2}>

            {showStatus && (
              <Grid.Row>
                <Grid.Column>
                  <StatusMessageComponent
                    message={success || error}
                    className={success ? 'success-status' : 'error-status'}
                    reset={this.props.resetMessage}
                  />
                </Grid.Column>
              </Grid.Row>
          )}

            <Grid.Column>
              <Step.Group size="small" widths={2}>
                <Step active={step1Active} completed={!step1Active}>
                  <Icon name="laptop" />
                  <Step.Content>
                    <Step.Title>Device Info</Step.Title>
                    <Step.Description>Identify your device</Step.Description>
                  </Step.Content>
                </Step>

                {isAssetSpecsAvailable &&
                  <Step active={step2Active} disabled={step1Active}>
                    <Icon name="list ul" />
                    <Step.Content>
                      <Step.Title>Device Specs</Step.Title>
                      <Step.Description>Enter device specifications</Step.Description>
                    </Step.Content>
                  </Step>
                }
              </Step.Group>

              {stepContent}
            </Grid.Column>
          </Grid>
        </div>
      </NavBarComponent>
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
  success: PropTypes.string,
  error: PropTypes.string,
  resetMessage: PropTypes.func
};

AddAssetContainer.defaultProps = {
  categories: [],
  subcategories: [],
  assetTypes: [],
  assetMakes: [],
  modelNumbers: []
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
  assetTypesList.isLoading || assetMakesList.isLoading,
  success: assets.success,
  error: assets.errorMessage
});

export default connect(mapStateToProps, {
  loadCategoriesDropdown,
  loadSubCategoriesDropdown,
  loadAssetTypes,
  loadAssetMakesDropdown,
  loadModelNumbers,
  createAsset,
  resetMessage
})(AddAssetContainer);
