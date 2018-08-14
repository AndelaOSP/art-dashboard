import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ModelNumber from '../../_components/ModelNumber/ModelNumberContainer';

const props = {
  toastMessageContent: {
    type: 'success',
    message: ''
  },
  loadAssetMakesDropdown: jest.fn(),
  createModelNumbers: jest.fn(),
  toggleModal: jest.fn(),
  resetToastMessageContent: jest.fn(),
  assetMakes: []
};

describe('Renders <ModelNumberContainer /> tests', () => {
  const wrapper = shallow(<ModelNumber.WrappedComponent {...props} />);

  it('calls the onAddModelNumber function', () => {
    const onAddModelNumberSpy = jest.spyOn(
      wrapper.instance(), 'onAddModelNumber'
    );
    const event = { target: { value: '' } };
    const data = {};

    wrapper.instance().onAddModelNumber(event, data);
    expect(onAddModelNumberSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onSelectAssetMake function', () => {
    const onSelectAssetMakeSpy = jest.spyOn(
      wrapper.instance(), 'onSelectAssetMake'
    );
    const event = { target: { value: '' } };
    const data = {};

    wrapper.instance().onSelectAssetMake(event, data);
    expect(onSelectAssetMakeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onChangeButtonState function', () => {
    const onChangeButtonStateSpy = jest.spyOn(
      wrapper.instance(), 'onChangeButtonState'
    );
    const event = {};
    const data = {};

    wrapper.instance().onChangeButtonState(event, data);
    expect(onChangeButtonStateSpy.mock.calls.length).toEqual(1);
  });

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
