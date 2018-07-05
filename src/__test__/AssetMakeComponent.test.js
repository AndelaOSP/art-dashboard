import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import jest from 'jest-mock';
import { spy } from 'sinon';
import { AddAssetMakeComponent } from '../components/AssetMake/AddAssetMakeComponent';

const toggleModal = spy();

describe('Renders <AddAssetMakeComponent /> correctly', () => {
  const props = {
    toggleModal,
    handleSubmit: jest.fn(),
    onaddAssetMake: jest.fn(),
    assetTypes: [],
    onSelectAssetType: jest.fn()
  };

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
  });

  it('Should find the Cancel Button', () => {
    expect(wrapper.find('.cancel-button').length).toEqual(1);
    wrapper.find('.cancel-button').simulate('click');
    expect(toggleModal.callCount).toEqual(1);
  });
});
