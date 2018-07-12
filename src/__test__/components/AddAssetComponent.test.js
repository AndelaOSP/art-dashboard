import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import AddAssetContainer from '../../_components/Assets/AddAssetContainer';

import assetCategories from '../../_mock/assetCategories';
import assetSubCategories from '../../_mock/subcategories';
import assetTypes from '../../_mock/assetTypes';
import assetMakes from '../../_mock/assetMakes';
import { modelNumbers } from '../../_mock/modelNumbers';

const props = {
  handleDropdownChanges: jest.fn(),
  onSelectModelNumber: jest.fn(),
  onAddSerialNumber: jest.fn(),
  onAddAssetTag: jest.fn(),
  onCreateAsset: jest.fn(),
  loadCategoriesDropdown: jest.fn(),
  loadSubCategoriesDropdown: jest.fn(),
  loadAssetTypes: jest.fn(),
  loadAssetMakes: jest.fn(),
  loadModelNumbers: jest.fn(),
  filteredSubCategories: [],
  filteredAssetTypes: [],
  filteredAssetMakes: [],
  filteredModelNumbers: [],
  modelNumber: 0,
  serialNumber: '',
  assetTag: '',
  buttonState: false,
  onChangeButtonState: jest.fn(),
  resetToastMessageContent: jest.fn(),
  toggleModal: jest.fn(),
  toastMessageContent: {
    type: '',
    message: ''
  },
  categories: assetCategories,
  subcategories: assetSubCategories,
  assetTypes,
  assetMakes,
  modelNumbers
};

const wrapper = mount(
  <AddAssetContainer.WrappedComponent {...props} />
);

const instance = wrapper.instance();
instance.setState({
  modelNumber: 0,
  serialNumber: '',
  assetTag: '',
  saveButtonState: false,
  filteredSubCategories: [],
  filteredAssetTypes: [],
  filteredAssetMakes: [],
  filteredModelNumbers: []
});

describe('<AddAssetContainer />', () => {
  it('should render 5 dropdown fields', () => {
    expect(wrapper.find('DropdownComponent').length).toEqual(5);
  });

  it('should render save button on add asset types component', () => {
    expect(wrapper.find('.save').length).toEqual(1);
  });

  it('should render cancel button on add asset types component', () => {
    expect(wrapper.find('.cancel').length).toEqual(1);
  });

  it('should run handleDropdownChanges when DropdownComponent changes for a category', () => {
    const event = { target: '', stopPropagation: jest.fn(), data: { name: 'asset-category', value: 1 } };
    instance.handleDropdownChanges(event, event.data);
    expect(instance.state.filteredSubCategories.length).toEqual(1);
  });

  it('should run handleDropdownChanges when DropdownComponent changes for a subcategory', () => {
    const event = { target: '', stopPropagation: jest.fn(), data: { name: 'asset-subcategory', value: 1 } };
    instance.handleDropdownChanges(event, event.data);
    expect(instance.state.filteredAssetTypes.length).toEqual(1);
  });

  it('should run handleDropdownChanges when DropdownComponent changes for a asset type', () => {
    const event = { target: '', stopPropagation: jest.fn(), data: { name: 'asset-types', value: 'monitoring' } };
    instance.handleDropdownChanges(event, event.data);
    expect(instance.state.filteredAssetMakes.length).toEqual(1);
  });

  it('should run handleDropdownChanges when DropdownComponent changes for a model number', () => {
    const event = { target: '', stopPropagation: jest.fn(), data: { name: 'asset-makes', value: 'Make Label Fake B' } };
    instance.handleDropdownChanges(event, event.data);
    expect(instance.state.filteredModelNumbers.length).toEqual(1);
  });

  it('should run onSelectModelNumber when selecting a model number', () => {
    const event = { target: '', stopPropagation: jest.fn(), data: { value: 3 } };
    instance.onSelectModelNumber(event, event.data);
    expect(instance.state.modelNumber).toEqual(3);
  });

  it('should run onAddSerialNumber when adding a serial number', () => {
    const event = { target: { value: 'QWERTY1231412' } };
    instance.onAddSerialNumber(event);
    expect(instance.state.serialNumber).toEqual('QWERTY1231412');
  });

  it('should run onAddAssetTag when adding an asset Tag', () => {
    const event = { target: { value: 'AND/MAC/1234' } };
    instance.onAddAssetTag(event);
    expect(instance.state.assetTag).toEqual('AND/MAC/1234');
  });

  it('should run onChangeButtonState when Save Button is clicked', () => {
    instance.onChangeButtonState();
    expect(instance.state.saveButtonState).toEqual(true);
  });

  it('can receive a success prop when getDerivedStateFromProps runs', () => {
    wrapper.setProps({
      toastMessageContent: {
        type: 'success',
        message: 'A success message'
      }
    });
    expect(wrapper.props().toastMessageContent.type).toEqual('success');
  });

  it('can receive an error prop when getDerivedStateFromProps runs', () => {
    wrapper.setProps({
      toastMessageContent: {
        type: 'error',
        message: 'An error message'
      }
    });
    expect(wrapper.props().toastMessageContent.type).toEqual('error');
  });
});
