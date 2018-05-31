import * as React from 'react';
import {
  Button,
  Form,
  Input,
  Header,
  Grid
} from 'semantic-ui-react';

import AddAssetDropdown from './AddAssetDropdown';

const placeCategoriesInSemanticUIOptions = (props) => {
  return props.map((option, index) => ({
      key: index,
      text: option.category_name,
      value: option.id
    }));
};

class AddAssetComponent extends React.Component {
  render(){
    return (
      <div style={{width: '70%'}}>
        <Header size='medium' textAlign='center'>Add an Asset</Header>
        <Form onSubmit={this.props.onCreateAsset}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <Form.Group widths='equal' inline>
                <label style={{width: '100px', textAlign: 'left'}}>Category</label>
                <AddAssetDropdown
                  label='Asset Category'
                  options={placeCategoriesInSemanticUIOptions(this.props.categories)}
                  placeHolder='Select Asset Category'
                  name='asset-category'
                  onChange={this.props.handleDropdownChanges}
                />
              </Form.Group>
              <Form.Group widths='equal' inline>
                <label style={{width: '100px', textAlign: 'left'}}>Sub Category</label>
                <AddAssetDropdown
                  label='Asset Subcategory'
                  options={this.props.filteredSubCategories}
                  placeholder='Select Asset Subcategory'
                  name='asset-subcategory'
                  onChange={this.props.handleDropdownChanges}
                />
              </Form.Group>
              <Form.Group widths='equal' inline>
                <label style={{width: '100px', textAlign: 'left'}}>Type</label>
                <AddAssetDropdown
                  label='Asset Type'
                  options={this.props.filteredAssetTypes}
                  placeholder='Select Asset Type'
                  name='asset-types'
                  onChange={this.props.handleDropdownChanges}
                />
              </Form.Group>
              <Form.Group widths='equal' inline>
                <label style={{width: '100px', textAlign: 'left'}}>Make</label>
                <AddAssetDropdown
                  label='Asset Make'
                  options={this.props.filteredAssetMakes}
                  placeholder='Select Asset Make'
                  name='asset-makes'
                  onChange={this.props.handleDropdownChanges}
                />
              </Form.Group>
            </Grid.Column>
            <Grid.Column width={6}>
              <Form.Group widths='equal' inline>
                <label style={{width: '100px', textAlign: 'left'}}>Model</label>
                <AddAssetDropdown
                  label='Asset Model Number'
                  options={this.props.filteredModelNumbers}
                  placeholder='Select Asset Model Number'
                  onChange={this.props.onSelectModelNumber}
                />
              </Form.Group>
              <Form.Group widths='equal' inline>
                <label style={{width: '100px', textAlign: 'left'}}>Serial Number</label>
                <Input
                  style={{width: '65%'}}
                  placeholder='Enter Serial Number'
                  name='serial-number'
                  onChange={this.props.onAddSerialNumber}
                />
              </Form.Group>
              <Form.Group widths='equal' inline>
                <label style={{width: '100px', textAlign: 'left'}}>Asset Tag</label>
                <Input
                  style={{width: '65%'}}
                  placeholder='Enter Asset Tag'
                  name='asset-tag'
                  onChange={this.props.onAddAssetTag}
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
    )
  }
}
export default AddAssetComponent;
