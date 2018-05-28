import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Dropdown,
  Header
} from 'semantic-ui-react';

// actions
import { loadCategories } from '../_actions/category.actions';
import { loadSubCategories } from '../_actions/subcategory.actions';
import { loadAssetTypes } from '../_actions/assetTypes.actions';
import { loadAssetMakes } from '../_actions/assetMakes.actions';
import { loadModelNumbers } from '../_actions/modelNumbers.actions';

// utils
import {
  filterSubCategories,
  filterAssetTypes,
  filterAssetMakes,
  filterModelNumbers
} from  '../_utils/filterDropdowns'

const placeCategoryPropsInSemanticUIOptions = (props) => {
  let optionsList = []
  for (let i = 0; i < props.length; i++) {
    optionsList.push({
      key: i,
      text: props[i].category_name,
      value: props[i].id
    });
  }
  return optionsList;
};

const isEmpty = (props) => {
  if (props.length <=1) {
    return true;
  }
  return false;
}

class AddAssetComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredSubCategories: [],
      filteredAssetTypes: [],
      filteredAssetMakes: [],
      filteredModelNumbers: []
    };
  }

  componentDidMount() {
    if (isEmpty(this.props.categories)) {
      this.props.loadCategories();
    }
    if (isEmpty(this.props.subcategories)) {
      this.props.loadSubCategories();
    }
    if (isEmpty(this.props.assetTypes)) {
      this.props.loadAssetTypes();
    }
    if (isEmpty(this.props.assetMakes)) {
      this.props.loadAssetMakes();
    }
    if (isEmpty(this.props.modelNumbers)) {
      this.props.loadModelNumbers();
    }
  }

  handleDropdownChange = (e, data) => {
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

  render(){
    return (
      <div style={{width: '50%'}}>
        <Header size='medium'>Add Asset</Header>
        <Form>
          <Form.Group widths='equal'>
            <Dropdown
              fluid
              search
              selection
              label='Asset Category'
              options={placeCategoryPropsInSemanticUIOptions(this.props.categories)}
              placeholder='Select Asset Category'
              name='asset-category'
              onChange={this.handleDropdownChange}
            />
            <Dropdown
              fluid
              search
              selection
              label='Asset Subcategory'
              options={this.state.filteredSubCategories}
              placeholder='Select Asset Subcategory'
              name='asset-subcategory'
              onChange={this.handleDropdownChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Dropdown
              fluid
              search
              selection
              label='Asset Type'
              options={this.state.filteredAssetTypes}
              placeholder='Select Asset Type'
              name='asset-types'
              onChange={this.handleDropdownChange}
            />
            <Dropdown
              fluid
              search
              selection
              label='Asset Make'
              options={this.state.filteredAssetMakes}
              placeholder='Select Asset Make'
              name='asset-makes'
              onChange={this.handleDropdownChange}
            />
          </Form.Group>
            <Dropdown
              fluid
              search
              selection
              label='Asset Model Number'
              options={this.state.filteredModelNumbers}
              placeholder='Select Asset Model Number'
            />
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Asset Tag'
              placeholder='Enter Asset Tag'
            />
            <Form.Field
              control={Input}
              label='Asset Serial Number'
              placeholder='Enter Asset Serial Number'
            />
          </Form.Group>
          <Form.Field control={Button}>Save New Asset</Form.Field>
        </Form>
      </div>
    )
  }
}
const mapStateToProps = (
  { categoriesList,
    subcategoriesList,
    assetTypesList,
    assetMakesList,
    modelNumbersList
   }) => {
  const categories = categoriesList;
  const subcategories = subcategoriesList;
  const assetTypes = assetTypesList;
  const assetMakes = assetMakesList;
  const modelNumbers = modelNumbersList;
  return  { categories, subcategories, assetTypes, assetMakes, modelNumbers };
}
export default connect(mapStateToProps,
  {
    loadCategories,
    loadSubCategories,
    loadAssetTypes,
    loadAssetMakes,
    loadModelNumbers
   })(AddAssetComponent);
