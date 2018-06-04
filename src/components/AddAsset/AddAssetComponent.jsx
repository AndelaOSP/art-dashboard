import PropTypes from 'prop-types';
import * as React from 'react';
import {
  Button,
  Form,
  Input,
  Header,
  Grid
} from 'semantic-ui-react';

import AddAssetDropdown from './AddAssetDropdown';
import SideMenuComponent from '../../_components/SideMenuComponent';

import '../../_css/AddAssetComponent.css';

const placeCategoriesInSemanticUIOptions = (props) => {
  return props.map((option, index) => ({
    key: index,
    text: option.category_name,
    value: option.id
  }));
};

class AddAssetComponent extends React.Component {
  render() {
    return (
      <SideMenuComponent>
        <div className='form-wrapper'>
          <Header size='medium' textAlign='center'>Add an Asset</Header>
          <Form onSubmit={this.props.onCreateAsset}>
            <Grid centered>
              <Grid.Row>
                <Grid.Column width={6}>
                  <Form.Group widths='equal' inline>
                    <label className='label-style'>Category</label>
                    <AddAssetDropdown
                      label='Asset Category'
                      options={placeCategoriesInSemanticUIOptions(this.props.categories)}
                      placeHolder='Select Asset Category'
                      name='asset-category'
                      onChange={this.props.handleDropdownChanges}
                    />
                  </Form.Group>
                  <Form.Group widths='equal' inline>

                    <label className='label-style'>Type</label>
                    <AddAssetDropdown
                      label='Asset Type'
                      options={this.props.filteredAssetTypes}
                      placeholder='Select Asset Type'
                      name='asset-types'
                      onChange={this.props.handleDropdownChanges}
                    />
                  </Form.Group>
                  <Form.Group widths='equal' inline>
                    <label className='label-style'>Model</label>
                    <AddAssetDropdown
                      label='Asset Model Number'
                      options={this.props.filteredModelNumbers}
                      placeholder='Select Asset Model Number'
                      onChange={this.props.onSelectModelNumber}
                    />
                  </Form.Group>
                  <Form.Group widths='equal' inline>
                    <label className='label-style'>Asset Tag</label>
                    <Input
                      style={{ width: '65%' }}
                      placeholder='Enter Asset Tag'
                      name='asset-tag'
                      onChange={this.props.onAddAssetTag}
                    />
                  </Form.Group>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Form.Group widths='equal' inline>
                    <label className='label-style'>Sub Category</label>
                    <AddAssetDropdown
                      label='Asset Subcategory'
                      options={this.props.filteredSubCategories}
                      placeholder='Select Asset Subcategory'
                      name='asset-subcategory'
                      onChange={this.props.handleDropdownChanges}
                    />
                  </Form.Group>
                  <Form.Group widths='equal' inline>
                    <label className='label-style'>Make</label>
                    <AddAssetDropdown
                      label='Asset Make'
                      options={this.props.filteredAssetMakes}
                      placeholder='Select Asset Make'
                      name='asset-makes'
                      onChange={this.props.handleDropdownChanges}
                    />
                  </Form.Group>
                  <Form.Group widths='equal' inline>
                    <label className='label-style'>Serial Number</label>
                    <Input
                      style={{ width: '65%' }}
                      placeholder='Enter Serial Number'
                      name='serial-number'
                      onChange={this.props.onAddSerialNumber}
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
              <Grid.Row>
                <Grid.Column width={6}>
                  <Form.Group widths='equal'>
                    <Button type='submit' fluid>Save</Button>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </div>
      </SideMenuComponent>
    )
  }
}

AddAssetComponent.propTypes = {
  handleDropdownChanges: PropTypes.func,
  onSelectModelNumber: PropTypes.func,
  onAddSerialNumber: PropTypes.func,
  onAddAssetTag: PropTypes.func,
  onCreateAsset: PropTypes.func,
  filteredSubCategories: PropTypes.array,
  filteredAssetTypes: PropTypes.array,
  filteredAssetMakes: PropTypes.array,
  filteredModelNumbers: PropTypes.array,
  modelNumber: PropTypes.number,
  serialNumber: PropTypes.string,
  assetTag: PropTypes.string
};

export default AddAssetComponent;
