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
  onSelectYearOfManufacture: jest.fn(),
  onSelectProcessorType: jest.fn(),
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
  page: 0,
  specs: {
    year: '',
    processorType: '',
    processorSpeed: '',
    screenSize: '',
    storage: '',
    memory: ''
  },
  saveButtonState: false,
  filteredSubCategories: [],
  filteredAssetTypes: [],
  filteredAssetMakes: [],
  filteredModelNumbers: []
});

describe('<AddAssetContainer />', () => {
  it('should render 4 dropdown fields', () => {
    expect(wrapper.find('DropdownComponent').length).toEqual(4);
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

  it('should move to next page of add asset when next button clicked', () => {
    wrapper.find('.save').simulate('click');
    expect(wrapper.find('AddAssetComponent').length).toEqual(1);
  });

  it('should go back to the previous back when the circular one icon is clicked', () => {
    wrapper.find('.save').simulate('click');
    wrapper.find('.no-shade').simulate('click');
    expect(wrapper.find('FilterAssetComponent').length).toEqual(1);
  });

  it('should have data about the year when selecting year on manufacture', () => {
    wrapper.find('.save').simulate('click');
    wrapper.find('DropdownComponent .item').at(3).simulate('click');
    expect(wrapper.state().specs.year).toEqual(2015);
  });

  it('should have data about the processor type when selecting processor type', () => {
    wrapper.find('.save').simulate('click');
    wrapper.find('input[type="radio"][name="processorType"]').at(0).simulate('change');
    expect(wrapper.state().specs.processorType).toEqual('Intel core i3');
  });

  it('should have data about the processor speed when selecting processor speed', () => {
    wrapper.find('.save').simulate('click');
    wrapper.find('input[type="radio"][name="processorSpeed"]').at(1).simulate('change');
    expect(wrapper.state().specs.processorSpeed).toEqual('2.3');
  });

  it('should have data about the screen size when selecting screen size', () => {
    wrapper.find('.save').simulate('click');
    wrapper.find('input[type="radio"][name="screenSize"]').at(1).simulate('change');
    expect(wrapper.state().specs.screenSize).toEqual('15');
  });

  it('should have data about the storage when selecting storage', () => {
    wrapper.find('.save').simulate('click');
    wrapper.find('input[type="radio"][name="storage"]').at(2).simulate('change');
    expect(wrapper.state().specs.storage).toEqual('512');
  });

  it('should have data about the memory when selecting memory', () => {
    wrapper.find('.save').simulate('click');
    wrapper.find('input[type="radio"][name="memory"]').at(2).simulate('change');
    expect(wrapper.state().specs.memory).toEqual('16');
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
