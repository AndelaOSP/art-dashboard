import * as React from 'react';
import { connect } from 'react-redux';

import AddAssetComponent from './AddAssetComponent';

// actions
import { loadCategories } from '../../_actions/category.actions';
import { loadSubCategories } from '../../_actions/subcategory.actions';
import { loadAssetTypes } from '../../_actions/assetTypes.actions';
import { loadAssetMakes } from '../../_actions/assetMakes.actions';
import { loadModelNumbers } from '../../_actions/modelNumbers.actions';
import { createAsset } from '../../_actions/asset.actions';

// utils
import {
  filterSubCategories,
  filterAssetTypes,
  filterAssetMakes,
  filterModelNumbers
} from  '../../_utils/filterDropdowns';

import _ from 'lodash';

class AddAssetContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredSubCategories: [],
      filteredAssetTypes: [],
      filteredAssetMakes: [],
      filteredModelNumbers: [],
      modelNumber: 0,
      serialNumber: '',
      assetTag: ''
    };
  }

  componentDidMount() {
    if (_.isEmpty(this.props.categories)) {
      this.props.loadCategories();
    }
    if (_.isEmpty(this.props.subcategories)) {
      this.props.loadSubCategories();
    }
    if (_.isEmpty(this.props.assetTypes)) {
      this.props.loadAssetTypes();
    }
    if (_.isEmpty(this.props.assetMakes)) {
      this.props.loadAssetMakes();
    }
    if (_.isEmpty(this.props.modelNumbers)) {
      this.props.loadModelNumbers();
    }
  }

  placeCategoriesInSemanticUIOptions = (props) => {
    return props.map((option, index) => ({
        key: index,
        text: option.category_name,
        value: option.id
      }));
  };

  handleDropdownChanges = (event, data) => {
    if(data.name === 'asset-category') {
      this.setState({
        filteredSubCategories:
        filterSubCategories(this.props.subcategories, data.value)
      });
    } else if (data.name === 'asset-subcategory') {
      this.setState({
        filteredAssetTypes:
        filterAssetTypes(this.props.assetTypes, data.value)
      });
    } else if (data.name === 'asset-types') {
      this.setState({
        filteredAssetMakes:
        filterAssetMakes(this.props.assetMakes, data.value)
      });
    } else if (data.name === 'asset-makes') {
      this.setState({
        filteredModelNumbers:
        filterModelNumbers(this.props.modelNumbers, data.value)
      });
    }
  };

  onSelectModelNumber = (event, data) => {
    this.setState({ modelNumber: data.value });
  };

  onAddSerialNumber = (event) => {
    this.setState({ serialNumber: event.target.value });
  };

  onAddAssetTag = (event) => {
    this.setState({ assetTag: event.target.value });
  };

  onCreateAsset = (event, data) => {
    this.props.createAsset({
      "asset_code": this.state.assetTag,
      "serial_number": this.state.serialNumber,
      "model_number": this.state.modelNumber
    });
  };

  render(){
    return (
      <AddAssetComponent
        categories={this.props.categories}
        subcategories={this.props.subcategories}
        assetTypes={this.props.assetTypes}
        assetMakes={this.props.assetMakes}
        handleDropdownChanges={this.handleDropdownChanges}
        modelNumbers={this.props.modelNumbers}
        onSelectModelNumber={this.onSelectModelNumber}
        onAddSerialNumber={this.onAddSerialNumber}
        onAddAssetTag={this.onAddAssetTag}
        onCreateAsset={this.onCreateAsset}
        filteredSubCategories={this.state.filteredSubCategories}
        filteredAssetTypes={this.state.filteredAssetTypes}
        filteredAssetMakes={this.state.filteredAssetMakes}
        filteredModelNumbers={this.state.filteredModelNumbers}
        modelNumber={this.state.modelNumber}
        serialNumber={this.state.serialNumber}
        assetTag={this.state.assetTag}
      />
    );
  }
}

const mapStateToProps = (
  { categoriesList,
    subcategoriesList,
    assetTypesList,
    assetMakesList,
    modelNumbersList,
    assetsList
   }) => {
  const categories = categoriesList;
  const subcategories = subcategoriesList;
  const assetTypes = assetTypesList;
  const assetMakes = assetMakesList;
  const modelNumbers = modelNumbersList;
  const assets = assetsList;
  return  { categories, subcategories, assetTypes, assetMakes, modelNumbers, assets };
}
export default connect(mapStateToProps,
  {
    loadCategories,
    loadSubCategories,
    loadAssetTypes,
    loadAssetMakes,
    loadModelNumbers,
    createAsset
  })(AddAssetContainer);
