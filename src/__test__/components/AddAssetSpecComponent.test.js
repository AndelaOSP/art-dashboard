import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import AddAssetSpecComponent from '../../components/AssetSpecs/AddAssetSpecComponent';

const props = {
  toggleModal: jest.fn(),
  handleSubmit: jest.fn(),
  createAssetSpec: jest.fn(),
  isLoading: false
};

describe('Renders <AddAssetSpecComponent /> tests', () => {
  const wrapper = shallow(<AddAssetSpecComponent.WrappedComponent {...props} />);

  it('renders the form', () => {
    expect(wrapper.find('Form').length).toEqual(1);
  });

  it('renders the InputFluid', () => {
    expect(wrapper.find('InputFluid').exists()).toBe(true);
  });

  it('should simulate form submit', () => {
    const form = wrapper.find('Form');
    expect(form.length).toEqual(1);
    form.simulate('submit');
    expect(props.handleSubmit.mock.calls.length).toEqual(1);
  });

  it('renders Loading component if isLoading is true', () => {
    wrapper.setProps({
      isLoading: true
    });
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });
});
