import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import EditableUserDetailsComponent from '../components/User/EditableUserDetailsComponent';

import { userDetail } from '../_mock/users';

describe('Renders <EditableUserDetailsComponent /> correctly', () => {
  const props = {
    errorMessage: '',
    hasError: false,
    isLoading: false,
    hasAssets: true,
    message: '',
    userDetail,
    updateUserDetail: jest.fn()
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EditableUserDetailsComponent {...props} />);
  });

  it('renders a table row component', () => {
    expect(wrapper.find('.is-admin-wrapper').length).toBe(1);
  });

  it('calls handleDropdownChange function', () => {
    const handleDropdownChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleDropdownChange'
    );

    const event = {
      stopPropagation: jest.fn()
    };
    const data = {};

    wrapper.instance().handleDropdownChange(event, data);
    expect(handleDropdownChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls toggleFormVisibility function', () => {
    const toggleFormVisibilitySpy = jest.spyOn(
      wrapper.instance(), 'toggleFormVisibility'
    );

    wrapper.instance().toggleFormVisibility();
    expect(toggleFormVisibilitySpy.mock.calls.length).toEqual(1);
  });

  it('calls the updateStatus function', () => {
    const updateUsersStatusSpy = jest.spyOn(
      wrapper.instance(), 'updateUserStatus'
    );

    wrapper.instance().updateUserStatus();
    expect(updateUsersStatusSpy.mock.calls.length).toEqual(1);
  });

  it('changes optionText state to Yes if value.data is Yes', () => {
    wrapper.setState({ optionText: 'No' });

    const event = {
      stopPropagation: jest.fn()
    };
    const data = {
      value: 'Yes'
    };

    wrapper.instance().handleDropdownChange(event, data);
    expect(wrapper.state().optionText).toEqual('Yes');
  });

  it('changes optionText state to No if value.data is No', () => {
    wrapper.setState({ optionText: 'Yes' });

    const event = {
      stopPropagation: jest.fn()
    };
    const data = {
      value: 'No'
    };

    wrapper.instance().handleDropdownChange(event, data);
    expect(wrapper.state().optionText).toEqual('No');
  });
});
