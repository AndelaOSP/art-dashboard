import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import AddAssetSpecComponent from '../../components/AssetSpecs/AddAssetSpecComponent';

describe('Renders <AddAssetSpecComponent /> tests', () => {
  const props = {
    handleSubmit: jest.fn(),
    handleInputChange: jest.fn(),
    createAssetSpec: jest.fn(),
    isLoading: false,
    assetSpec: {
      year_of_manufacture: '',
      processor_speed: '',
      screen_size: '',
      processor_type: '',
      storage: '',
      memory: ''
    }
  };

  const wrapper = shallow(<AddAssetSpecComponent {...props} />);

  it('renders the form', () => {
    expect(wrapper.find('Form').length).toEqual(1);
  });

  it('renders the DropdownComponent', () => {
    expect(wrapper.find('DropdownComponent').exists()).toBe(true);
  });

  it('should simulate form submit', () => {
    const form = wrapper.find('Form');
    expect(form.length).toEqual(1);
    form.simulate('submit');
    expect(props.handleSubmit.mock.calls.length).toEqual(1);
  });
});
