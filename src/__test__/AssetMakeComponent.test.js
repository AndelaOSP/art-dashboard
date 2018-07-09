import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { spy } from 'sinon';
import AddAssetMakeComponent from '../components/AssetMake/AddAssetMakeComponent';
import AssetMakeContainer from '../_components/AssetMake/AssetMakeContainer';

const toggleModal = spy();
const onChangeButtonState = spy();
const props = {
  toggleModal,
  handleSubmit: jest.fn(),
  onChangeButtonState,
  onaddAssetMake: jest.fn(),
  assetTypes: [],
  onSelectAssetType: jest.fn(),
  addAssetMakes: jest.fn(),
  loadDropdownAssetTypes: jest.fn(),
  loadAssetMakes: jest.fn(),
  resetToastMessageContent: jest.fn(),
  toastMessageContent: {}
};

describe('Renders <AddAssetMakeComponent /> correctly', () => {
  const wrapper = mount(<AddAssetMakeComponent {...props} />);

  it('Should find the form', () => {
    expect(wrapper.find('Form').length).toEqual(1);
  });

  it('Should find the InputFluid', () => {
    expect(wrapper.find('#make').length).toEqual(1);
  });

  it('Should find the DropdownComponent', () => {
    expect(wrapper.find('DropdownComponent').length).toEqual(1);
  });

  it('Should find the DropdownComponent', () => {
    expect(wrapper.find('DropdownComponent').length).toEqual(1);
  });

  it('Should find the Save Button', () => {
    expect(wrapper.find('.save-button').length).toEqual(1);
    wrapper.find('.save-button').simulate('click');
    expect(onChangeButtonState.callCount).toEqual(1);
  });

  it('Should find the Cancel Button', () => {
    expect(wrapper.find('.cancel-button').length).toEqual(1);
    wrapper.find('.cancel-button').simulate('click');
    expect(toggleModal.callCount).toEqual(1);
  });
});

describe('Renders <AssetMakeContainer /> correctly', () => {
  const wrapper = mount(<AssetMakeContainer.WrappedComponent {...props} />);
  const instance = wrapper.instance();
  instance.setState({
    assetMake: '',
    assetType: '',
    saveButtonState: false
  });

  it('should render <AddAssetMakeComponent />', () => {
    expect(wrapper.find(AddAssetMakeComponent).length).toEqual(1);
  });

  it('should call onChangeButtonState when Save Button is clicked', () => {
    instance.onChangeButtonState();
    expect(instance.state.saveButtonState).toEqual(true);
  });

  it('should call onAddAssetMake when asset Make input field content changes', () => {
    const event = { target: { value: 'Microsoft' } };
    instance.onAddAssetMake(event);
    expect(instance.state.assetMake).toEqual('Microsoft');
  });

  it('should call onSelectAssetType when DropdownComponent changes', () => {
    const event = { target: '', data: { name: 'Laptops', value: 1 } };
    instance.onSelectAssetType(event, event.data);
    expect(instance.state.assetType).toEqual(1);
  });

  it('should receive a message type prop when getDerivedStateFromProps loads', () => {
    wrapper.setProps({
      toastMessageContent: {
        type: 'success',
        message: 'A success message'
      }
    });
    expect(wrapper.props().toastMessageContent.type).toEqual('success');
  });
});
