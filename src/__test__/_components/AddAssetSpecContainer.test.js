import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import AddAssetContainer from '../../_components/AssetSpecs/AddAssetSpecContainer';

describe('Renders <AddAssetContainer /> tests', () => {
  const props = {
    handleSubmit: jest.fn(),
    handleInputChange: jest.fn(),
    createAssetSpec: async () => {},
    isLoading: false,
    history: {
      push: jest.fn()
    }
  };

  const wrapper = shallow(<AddAssetContainer.WrappedComponent {...props} />);

  it('calls the handleSubmit function', () => {
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    const event = {
      target: { value: '', reset: jest.fn() },
      preventDefault: jest.fn()
    };
    const data = {};

    wrapper.instance().handleSubmit(event, data);
    expect(handleSubmitSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handleInputChange function', () => {
    const handleInputChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleInputChange'
    );
    const event = {
      target: { value: '', reset: jest.fn() },
      preventDefault: jest.fn()
    };
    const data = {};

    wrapper.instance().handleInputChange(event, data);
    expect(handleInputChangeSpy.mock.calls.length).toEqual(1);
  });
});
