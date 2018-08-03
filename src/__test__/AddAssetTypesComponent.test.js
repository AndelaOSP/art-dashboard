import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';

import AddAssetTypeContainer from '../_components/AssetTypes/AddAssetTypesContainer';
import AddAssetTypesComponent from '../components/AssetTypes/AddAssetTypesComponent';

const props = {
  onAddAssetType: jest.fn(),
  onSelectSubCategory: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeButtonState: jest.fn(),
  buttonState: false,
  toggleModal: jest.fn(),
  subcategories: [],
  loadSubCategoriesDropdown: jest.fn(),
  createAssetType: jest.fn(),
  resetToastMessageContent: jest.fn(),
  toastMessageContent: {
    type: '',
    message: ''
  }
};

const wrapper = shallow(<AddAssetTypesComponent {...props} />);

const wrapper2 = mount(
  <AddAssetTypeContainer.WrappedComponent {...props} />
);

describe('renders <AddAssetTypesComponent />', () => {
  it('should render asset type input field', () => {
    expect(wrapper.find('TextInputComponent').length).toEqual(1);
  });

  it('should render subcategories dropdown', () => {
    expect(wrapper.find('DropdownComponent').length).toEqual(1);
  });

  it('should render save button on add asset types component', () => {
    expect(wrapper.find('.save').length).toEqual(1);
  });

  it('should render cancel button on add asset types component', () => {
    expect(wrapper.find('.cancel').length).toEqual(1);
  });

  it('should change props of buttonState to true', () => {
    expect(wrapper.find('.save').props().buttonState).toEqual(false);
    wrapper.setProps({ buttonState: true });
    expect(wrapper.find('.save').props().buttonState).toEqual(true);
  });
});

describe('AddAssetTypeContainer', () => {
  const instance = wrapper2.instance();
  instance.setState({
    subCategory: '',
    assetType: '',
    saveButtonState: false
  });

  it('should render <AddAssetTypesComponent />', () => {
    expect(wrapper2.find(AddAssetTypesComponent).length).toEqual(1);
  });

  it('should run onSelectSubCategory when DropdownComponent changes', () => {
    const event = { target: '', data: { name: 'subcategory', value: 4 } };
    instance.onSelectSubCategory(event, event.data);
    expect(instance.state.subCategory).toEqual(4);
  });

  it('should run onAddAssetType when TextInputComponent changes', () => {
    const event = { target: { value: 'Adapters' } };
    instance.onAddAssetType(event);
    expect(instance.state.assetType).toEqual('Adapters');
  });

  it('should run onChangeButtonState when Save Button is clicked', () => {
    instance.onChangeButtonState();
    expect(instance.state.saveButtonState).toEqual(true);
  });

  it('can receive a success prop when getDerivedStateFromProps runs', () => {
    wrapper2.setProps({
      toastMessageContent: {
        type: 'success',
        message: 'A success message'
      }
    });
    expect(wrapper2.props().toastMessageContent.type).toEqual('success');
  });

  it('can receive an error prop when getDerivedStateFromProps runs', () => {
    wrapper2.setProps({
      toastMessageContent: {
        type: 'error',
        message: 'An error message'
      }
    });
    expect(wrapper2.props().toastMessageContent.type).toEqual('error');
  });
});

