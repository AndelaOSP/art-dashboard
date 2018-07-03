import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssetTypesComponent from '../components/AssetTypes/AssetTypesComponent';

describe('renders <AssetTypesComponent />', () => {
  const props = {
    onAddAssetType: jest.fn(),
    onSelectSubCategory: jest.fn(),
    handleSubmit: jest.fn(),
    onChangeButtonState: jest.fn(),
    buttonState: false,
    toggleModal: jest.fn(),
    subcategories: []
  };
  const wrapper = shallow(<AssetTypesComponent {...props} />);

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

