import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetDetailComponent } from '../components/AssetDetailComponent';
import assetMocks from '../_mock/newAllocation';

describe('Renders <AssetDetailComponent /> correctly', () => {
  const props = {
    assetDetail: assetMocks.assetDetails,
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
