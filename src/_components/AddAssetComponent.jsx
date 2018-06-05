import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Input,
  Dropdown,
  Header,
  Grid
} from 'semantic-ui-react';

import SideMenuComponent from '../_components/SideMenuComponent';

// actions
import { loadCategories } from '../_actions/category.actions';
import { loadSubCategories } from '../_actions/subcategory.actions';
import { loadAssetTypes } from '../_actions/assetTypes.actions';
import { loadAssetMakes } from '../_actions/assetMakes.actions';
import { loadModelNumbers } from '../_actions/modelNumbers.actions';
import { createAsset } from '../_actions/asset.actions';

// utils
import {
  filterSubCategories,
  filterAssetTypes,
  filterAssetMakes,
  filterModelNumbers
} from '../_utils/filterDropdowns'

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
  if (props.length <= 1) {
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
      filteredModelNumbers: [],
      modelNumber: 0,
      serialNumber: '',
      assetTag: ''
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

  handleDropdownChanges = (e, data) => {
    if (data.name === 'asset-category') {
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

  render() {
    return (
      <SideMenuComponent>
        <div style={{ width: '70%' }}>
          <Header size='medium' textAlign='center'>Add an Asset</Header>
          <Form onSubmit={this.onCreateAsset}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={6}>
                  <Form.Group widths='equal' inline>
                    <label style={{ width: '100px', textAlign: 'left' }}>Category</label>
                    <Dropdown
                      style={{ width: '65%' }}
                      fluid
                      search
                      selection
                      label='Asset Category'
                      options={placeCategoryPropsInSemanticUIOptions(this.props.categories)}
                      placeholder='Select Asset Category'
                      name='asset-category'
                      onChange={this.handleDropdownChanges}
                    />
                  </Form.Group>
                  <Form.Group widths='equal' inline>
                    <label style={{ width: '100px', textAlign: 'left' }}>Sub Category</label>
                    <Dropdown
                      style={{ width: '65%' }}
                      fluid
                      search
                      selection
                      label='Asset Subcategory'
                      options={this.state.filteredSubCategories}
                      placeholder='Select Asset Subcategory'
                      name='asset-subcategory'
                      onChange={this.handleDropdownChanges}
                    />
                  </Form.Group>
                  <Form.Group widths='equal' inline>
                    <label style={{ width: '100px', textAlign: 'left' }}>Type</label>
                    <Dropdown
                      style={{ width: '65%' }}
                      fluid
                      search
                      selection
                      label='Asset Type'
                      options={this.state.filteredAssetTypes}
                      placeholder='Select Asset Type'
                      name='asset-types'
                      onChange={this.handleDropdownChanges}
                    />
                  </Form.Group>
                  <Form.Group widths='equal' inline>
                    <label style={{ width: '100px', textAlign: 'left' }}>Make</label>
                    <Dropdown
                      style={{ width: '65%' }}
                      fluid
                      search
                      selection
                      label='Asset Make'
                      options={this.state.filteredAssetMakes}
                      placeholder='Select Asset Make'
                      name='asset-makes'
                      onChange={this.handleDropdownChanges}
                    />
                  </Form.Group>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Form.Group widths='equal' inline>
                    <label style={{ width: '100px', textAlign: 'left' }}>Model</label>
                    <Dropdown
                      style={{ width: '65%' }}
                      fluid
                      search
                      selection
                      label='Asset Model Number'
                      options={this.state.filteredModelNumbers}
                      placeholder='Select Asset Model Number'
                      onChange={this.onSelectModelNumber}
                    />
                  </Form.Group>
                  <Form.Group widths='equal' inline>
                    <label style={{ width: '100px', textAlign: 'left' }}>Serial Number</label>
                    <Input
                      style={{ width: '65%' }}
                      placeholder='Enter Serial Number'
                      name='serial-number'
                      onChange={this.onAddSerialNumber}
                    />
                  </Form.Group>
                  <Form.Group widths='equal' inline>
                    <label style={{ width: '100px', textAlign: 'left' }}>Asset Tag</label>
                    <Input
                      style={{ width: '65%' }}
                      placeholder='Enter Asset Tag'
                      name='asset-tag'
                      onChange={this.onAddAssetTag}
                    />
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={6}>
                  <Form.TextArea
                    label='Asset Specs'
                    placeholder='Indepth details about asset...'
                  />
                </Grid.Column>
                <Grid.Column width={6}>
                  <Form.TextArea
                    label='Condition'
                    placeholder='...'
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Form.Group widths='equal'>
              <Button type='submit'>Save</Button>
            </Form.Group>
          </Form>
        </div>
      </SideMenuComponent>
    )
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
  return { categories, subcategories, assetTypes, assetMakes, modelNumbers, assets };
}
export default connect(mapStateToProps,
  {
    loadCategories,
    loadSubCategories,
    loadAssetTypes,
    loadAssetMakes,
    loadModelNumbers,
    createAsset
  })(AddAssetComponent);
