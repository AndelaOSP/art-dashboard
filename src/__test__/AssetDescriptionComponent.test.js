import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import AssetDescriptionComponent from '../components/AssetDescriptionComponent';
import assetMocks from '../_mock/newAllocation';

describe('Renders <AssetDescriptionComponent /> correctly', () => {
  const props = {
    assetDetail: assetMocks.assetDetails,
    errorMessage: '',
    loadAssetAssigneeUsers: jest.fn(),
    allocateAsset: jest.fn(),
    getAssetDetail: jest.fn(),
    unassignAsset: jest.fn(),
    hasError: false,
    isLoading: {},
    location: {
      pathname: ''
    },
    assignedUser: {},
    selectedUser: '',
    specs: {}
  };
  const wrapper = mount(<AssetDescriptionComponent.WrappedComponent {...props} />);
  it('should mock the handleAssign function call', () => {
    const handleAssignSpy = jest.spyOn(
      wrapper.instance(), 'handleAssign'
    );
    wrapper.setProps({ buttonLoading: false });
    wrapper.instance().handleAssign();
    expect(handleAssignSpy.mock.calls.length).toEqual(1);
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

  it('should mock the handleUnassign function call if assignedUser is empty', () => {
    const handleUnassignSpy = jest.spyOn(
      wrapper.instance(), 'handleUnassign'
    );
    wrapper.setState({ assignedUser: {} });
    wrapper.instance().handleConfirm();
    expect(handleUnassignSpy.mock.calls.length).toEqual(1);
  });

  it('renders the asset description component', () => {
    expect(wrapper.find('.asset-description').exists()).toEqual(true);
  });

  it('renders the assign button and dropdown when no user is assigned', () => {
    wrapper.setState({ assignedUser: {}, assignAssetButtonState: true });
    expect(wrapper.find('ButtonComponent').props().buttonName).toBe('Assign Asset');
    expect(wrapper.find('DropdownComponent').length).toBe(1);
  });
});
