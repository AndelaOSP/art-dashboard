import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetDetailComponent } from '../components/AssetDetailComponent';
import asset from '../_mock/asset';

describe('Renders <AssetDetailComponent /> correctly', () => {
  const props = {
    assetDetail: asset,
    errorMessage: '',
    loadDropDownUsers: jest.fn(),
    allocateAsset: jest.fn(),
    getAssetDetail: jest.fn(),
    unassignAsset: jest.fn(),
    hasError: false,
    isLoading: false,
    location: {
      pathname: ''
    }
  };
  const wrapper = shallow(<AssetDetailComponent {...props} />);

  it('renders page title', () => {
    expect(wrapper.find('Header').prop('content')).toEqual('Asset Detail');
  });

  it('renders the AssetsDetailsContent component', () => {
    expect(wrapper.find('AssetDetailContent').length).toBe(1);
  });

  it('should not rerender the component if the error message is the same', () => {
    const shouldComponentUpdateSpy = jest.spyOn(
      wrapper.instance(), 'shouldComponentUpdate'
    );
    wrapper.setProps({ hasError: true });
    expect(shouldComponentUpdateSpy.mock.calls.length).toBe(1);
  });

  it('should rerender the component if the error message changes', () => {
    const shouldComponentUpdateSpy = jest.spyOn(
      wrapper.instance(), 'shouldComponentUpdate'
    );
    wrapper.setProps({ hasError: true, errorMessage: 'error' });
    expect(shouldComponentUpdateSpy.mock.calls.length).toBe(2);
  });

  it('should mock the onSelectUserEmail function call', () => {
    const onSelectUserEmailSpy = jest.spyOn(
      wrapper.instance(), 'onSelectUserEmail'
    );
    const event = {};
    const data = {};
    wrapper.instance().onSelectUserEmail(event, data);
    expect(onSelectUserEmailSpy.mock.calls.length).toEqual(1);
  });

  it('should mock the handleAssign function call', () => {
    const handleAssignSpy = jest.spyOn(
      wrapper.instance(), 'handleAssign'
    );
    wrapper.instance().handleAssign();
    expect(handleAssignSpy.mock.calls.length).toEqual(1);
  });

  it('should mock the handleUnassign function call', () => {
    const handleUnassignSpy = jest.spyOn(
      wrapper.instance(), 'handleUnassign'
    );
    wrapper.instance().handleUnassign();
    expect(handleUnassignSpy.mock.calls.length).toEqual(1);
  });

  it('should mock the handleConfirm function call', () => {
    const handleConfirmSpy = jest.spyOn(
      wrapper.instance(), 'handleConfirm'
    );
    wrapper.instance().handleConfirm();
    expect(handleConfirmSpy.mock.calls.length).toEqual(1);
  });

  it('should mock the handleCancel function call', () => {
    const handleCancelSpy = jest.spyOn(
      wrapper.instance(), 'handleCancel'
    );
    wrapper.instance().handleCancel();
    expect(handleCancelSpy.mock.calls.length).toEqual(1);
  });

  it('should mock the show function call', () => {
    const showSpy = jest.spyOn(
      wrapper.instance(), 'show'
    );
    wrapper.instance().show();
    expect(showSpy.mock.calls.length).toEqual(1);
  });
});
