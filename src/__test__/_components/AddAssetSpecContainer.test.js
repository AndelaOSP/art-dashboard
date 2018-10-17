import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import AddAssetContainer from '../../_components/AssetSpecs/AddAssetSpecContainer';

const props = {
  toggleModal: jest.fn(),
  handleSubmit: jest.fn(),
  createAssetSpec: jest.fn(),
  isLoading: false
};

describe('Renders <AddAssetContainer /> tests', () => {
  const wrapper = shallow(<AddAssetContainer.WrappedComponent {...props} />);

  it('calls the handleSubmit function', () => {
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    const event = { target: { value: '', reset: jest.fn() } };
    const data = {};

    wrapper.instance().handleSubmit(event, data);
    expect(handleSubmitSpy.mock.calls.length).toEqual(1);
  });
});
